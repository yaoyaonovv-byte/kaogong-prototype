"use client";

import Link from "next/link";
import { Bookmark, FileText, GitCompareArrows, ShieldAlert } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { MobileShell } from "@/components/mobile-shell";
import { StatusBadge } from "@/components/status-badge";
import { TrendChart } from "@/components/trend-chart";
import { useJobState } from "@/hooks/use-job-state";
import { averageAdmissionScore, averageCompetition } from "@/lib/recommendations";

export function JobDetailClient({ id }: { id: string }) {
  const state = useJobState();
  const recommendation = state.recommendations.find((item) => item.job.id === id);

  if (!recommendation) {
    return (
      <MobileShell title="岗位详情" backHref="/results">
        <div className="px-5 py-8 text-sm text-slate-500">未找到该岗位，请返回结果页重新选择。</div>
      </MobileShell>
    );
  }

  const { job } = recommendation;

  return (
    <MobileShell title="岗位详情" subtitle={job.city} backHref="/results">
      <section className="space-y-4 px-5 py-5">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
          <div className="flex flex-wrap gap-2">
            <StatusBadge value={recommendation.type} tone="type" />
            <StatusBadge value={recommendation.risk} tone="risk" />
            <StatusBadge value={recommendation.competition} tone="competition" />
          </div>
          <h1 className="mt-3 text-xl font-semibold leading-7 text-slate-950">{job.title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">{job.agency}</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">{job.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MetricCard label="匹配度" value={recommendation.matchScore} />
          <MetricCard label="平均竞争" value={`${averageCompetition(job)}:1`} />
          <MetricCard label="目标分" value={recommendation.targetScore} />
        </div>

        <TrendChart data={job.history} metric="competitionRatio" label="竞争比趋势" />
        <TrendChart data={job.history} metric="admissionScore" label={`录取分趋势 · 平均 ${averageAdmissionScore(job)}`} />

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-950">推荐理由</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            {recommendation.reasons.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          {recommendation.warnings.length > 0 && (
            <div className="mt-4 rounded-lg bg-orange-50 p-3 text-sm leading-6 text-orange-700">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <ShieldAlert size={16} />
                风险提示
              </div>
              {recommendation.warnings.map((item) => (
                <p key={item}>· {item}</p>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => state.toggleFavorite(job.id)}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700"
          >
            <Bookmark size={16} />
            {state.favorites.includes(job.id) ? "已收藏" : "收藏"}
          </button>
          <button
            type="button"
            onClick={() => state.toggleCompare(job.id)}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700"
          >
            <GitCompareArrows size={16} />
            {state.compare.includes(job.id) ? "已加入" : "加入对比"}
          </button>
        </div>
        <Link href="/report" className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1f4b99] text-sm font-semibold text-white">
          <FileText size={18} />
          查看深度分析
        </Link>
      </section>
    </MobileShell>
  );
}
