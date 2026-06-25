export type Education = "专科" | "本科" | "硕士" | "博士";

export type Degree = "无" | "学士" | "硕士" | "博士";

export type PoliticalStatus = "不限" | "群众" | "共青团员" | "中共党员";

export type ExamScope = "国考" | "省考" | "全部";

export type Preference = "综合推荐" | "上岸概率" | "地区优先" | "岗位质量" | "冷门机会";

export type CandidateProfile = {
  education: Education;
  degree: Degree;
  major: string;
  graduationYear: string;
  politicalStatus: PoliticalStatus;
  household: string;
  hometown: string;
  grassrootsYears: string;
  serviceProject: boolean;
  examScope: ExamScope;
  regions: string[];
  preference: Preference;
};

export type HistoricalStat = {
  year: number;
  hires: number;
  applicants: number;
  competitionRatio: number;
  interviewScore: number;
  admissionScore: number;
};

export type JobPost = {
  id: string;
  exam: "国考" | "省考";
  agency: string;
  title: string;
  region: string;
  city: string;
  level: string;
  hires: number;
  educationRequirement: Education[];
  degreeRequirement: Degree[];
  majorRequirements: string[];
  politicalRequirement: PoliticalStatus;
  grassrootsYears: number;
  serviceProjectRequired: boolean;
  description: string;
  history: HistoricalStat[];
};

export type RiskLevel = "稳妥" | "适中" | "冲刺" | "不建议";

export type CompetitionLevel = "低" | "中" | "高" | "极高";

export type RecommendationType = "保底岗" | "稳妥岗" | "冲刺岗" | "机会岗";

export type JobRecommendation = {
  job: JobPost;
  matchScore: number;
  competition: CompetitionLevel;
  risk: RiskLevel;
  type: RecommendationType;
  reasons: string[];
  warnings: string[];
  targetScore: number;
};
