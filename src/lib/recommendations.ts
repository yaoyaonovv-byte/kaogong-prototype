import { defaultProfile, jobPosts } from "./data";
import {
  CandidateProfile,
  CompetitionLevel,
  Education,
  JobPost,
  JobRecommendation,
  Preference,
  RecommendationType,
  RiskLevel,
} from "./types";

const educationRank: Record<Education, number> = {
  专科: 1,
  本科: 2,
  硕士: 3,
  博士: 4,
};

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function latestHistory(job: JobPost) {
  return job.history[job.history.length - 1];
}

export function averageCompetition(job: JobPost) {
  return Math.round(average(job.history.map((item) => item.competitionRatio)));
}

export function averageAdmissionScore(job: JobPost) {
  return Number(average(job.history.map((item) => item.admissionScore)).toFixed(1));
}

function majorMatches(profileMajor: string, requirements: string[]) {
  const normalized = profileMajor.trim().toLowerCase();
  return requirements.some((requirement) => {
    if (requirement === "不限") return true;
    return normalized.includes(requirement.toLowerCase()) || requirement.toLowerCase().includes(normalized);
  });
}

function educationMatches(profile: CandidateProfile, job: JobPost) {
  return job.educationRequirement.some(
    (required) => educationRank[profile.education] >= educationRank[required],
  );
}

function degreeMatches(profile: CandidateProfile, job: JobPost) {
  if (job.degreeRequirement.includes("无")) return true;
  return job.degreeRequirement.includes(profile.degree);
}

function politicalMatches(profile: CandidateProfile, job: JobPost) {
  return job.politicalRequirement === "不限" || profile.politicalStatus === job.politicalRequirement;
}

function regionMatches(profile: CandidateProfile, job: JobPost) {
  return profile.regions.length === 0 || profile.regions.includes(job.region) || profile.regions.includes(job.city);
}

function scopeMatches(profile: CandidateProfile, job: JobPost) {
  return profile.examScope === "全部" || profile.examScope === job.exam;
}

function grassrootsMatches(profile: CandidateProfile, job: JobPost) {
  return Number(profile.grassrootsYears || 0) >= job.grassrootsYears;
}

function serviceMatches(profile: CandidateProfile, job: JobPost) {
  return !job.serviceProjectRequired || profile.serviceProject;
}

function competitionLevel(job: JobPost): CompetitionLevel {
  const ratio = averageCompetition(job);
  if (ratio < 50) return "低";
  if (ratio < 100) return "中";
  if (ratio < 160) return "高";
  return "极高";
}

function riskLevel(job: JobPost, matchScore: number): RiskLevel {
  const ratio = averageCompetition(job);
  if (matchScore < 65 || ratio >= 190) return "不建议";
  if (ratio >= 140 || averageAdmissionScore(job) >= 138) return "冲刺";
  if (ratio >= 80) return "适中";
  return "稳妥";
}

function recommendationType(job: JobPost, risk: RiskLevel): RecommendationType {
  if (job.majorRequirements.length <= 2 && !job.majorRequirements.includes("不限")) return "机会岗";
  if (risk === "稳妥") return "保底岗";
  if (risk === "冲刺" || risk === "不建议") return "冲刺岗";
  return "稳妥岗";
}

function scoreJob(profile: CandidateProfile, job: JobPost) {
  let score = 35;
  const warnings: string[] = [];
  const reasons: string[] = [];

  if (scopeMatches(profile, job)) score += 8;
  if (educationMatches(profile, job)) {
    score += 12;
    reasons.push("学历条件满足岗位硬性要求");
  } else {
    score -= 28;
    warnings.push("学历条件不满足，需谨慎核对公告原文");
  }

  if (degreeMatches(profile, job)) score += 8;
  else {
    score -= 18;
    warnings.push("学位要求存在不匹配风险");
  }

  if (majorMatches(profile.major, job.majorRequirements)) {
    score += job.majorRequirements.includes("不限") ? 8 : 18;
    reasons.push(job.majorRequirements.includes("不限") ? "专业不限，报考门槛较宽" : "专业要求与当前专业高度相关");
  } else {
    score -= 24;
    warnings.push("专业匹配度偏低，建议人工确认专业目录");
  }

  if (politicalMatches(profile, job)) score += 8;
  else {
    score -= 16;
    warnings.push("政治面貌限制不匹配");
  }

  if (grassrootsMatches(profile, job)) score += job.grassrootsYears > 0 ? 10 : 5;
  else {
    score -= 14;
    warnings.push("基层工作年限不足");
  }

  if (serviceMatches(profile, job)) score += job.serviceProjectRequired ? 12 : 4;
  else {
    score -= 16;
    warnings.push("该岗位面向服务基层项目人员");
  }

  if (regionMatches(profile, job)) {
    score += 10;
    reasons.push("地区符合你的意向范围");
  }

  const ratio = averageCompetition(job);
  if (ratio < 60) {
    score += 14;
    reasons.push("近年竞争比处于低位");
  } else if (ratio < 110) {
    score += 8;
    reasons.push("竞争强度相对可控");
  } else if (ratio > 170) {
    score -= 12;
    warnings.push("近年竞争强度较高");
  }

  if (latestHistory(job).hires >= 4) {
    score += 8;
    reasons.push("招录人数较多，波动风险较低");
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    reasons,
    warnings,
  };
}

function sortWeight(recommendation: JobRecommendation, preference: Preference) {
  const ratio = averageCompetition(recommendation.job);
  const latest = latestHistory(recommendation.job);
  switch (preference) {
    case "上岸概率":
      return recommendation.matchScore * 1.2 - ratio * 0.25 + latest.hires * 5;
    case "地区优先":
      return recommendation.matchScore + (recommendation.job.region === defaultProfile.regions[0] ? 12 : 0);
    case "岗位质量":
      return recommendation.matchScore + (recommendation.job.level.includes("省直") || recommendation.job.level.includes("中央") ? 14 : 0);
    case "冷门机会":
      return recommendation.matchScore - ratio * 0.35 + (recommendation.type === "机会岗" ? 18 : 0);
    default:
      return recommendation.matchScore - ratio * 0.12 + latest.hires * 3;
  }
}

export function getRecommendations(profile: CandidateProfile = defaultProfile, preference = profile.preference) {
  return jobPosts
    .filter((job) => scopeMatches(profile, job))
    .map((job) => {
      const scored = scoreJob(profile, job);
      const competition = competitionLevel(job);
      const risk = riskLevel(job, scored.score);
      const recommendation: JobRecommendation = {
        job,
        matchScore: scored.score,
        competition,
        risk,
        type: recommendationType(job, risk),
        reasons: scored.reasons.slice(0, 3),
        warnings: scored.warnings.slice(0, 2),
        targetScore: Math.ceil(averageAdmissionScore(job) + 3),
      };
      return recommendation;
    })
    .sort((left, right) => sortWeight(right, preference) - sortWeight(left, preference));
}

export function getJobRecommendation(id: string, profile: CandidateProfile = defaultProfile) {
  return getRecommendations(profile).find((recommendation) => recommendation.job.id === id);
}

export function getJobById(id: string) {
  return jobPosts.find((job) => job.id === id);
}
