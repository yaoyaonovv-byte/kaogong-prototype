"use client";

import Link from "next/link";
import { BarChart3, FileText, Filter, Users } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { MetricCard } from "@/components/metric-card";
import { MobileShell } from "@/components/mobile-shell";
import { useJobState } from "@/hooks/use-job-state";
import { Preference } from "@/lib/types";

const preferences: Preference[] = ["综合推荐", "上岸概率", "地区优先", "岗位质量", "冷门机会"];

export default function ResultsPage() {
  const state = useJobState();
  const stable = state.recommendations.filter((item) => item.risk === "稳妥" || item.risk === "适中").length;
  const highRisk = state.recommendations.filter((item) => item.risk === "冲刺" || item.risk === "不建议").length;

  return (
    <MobileShell title="匹配结果" subtitle="按近年数据生成推荐" backHref="/match">
      <section className="space-y-4 px-5 py-5">
        <div className="grid grid-cols-3 gap-2">
          <MetricCard label="可报岗位" value={state.recommendations.length} icon={<Users size={18} />} />
          <MetricCard label="稳妥/适中" value={stable} icon={<BarChart3 size={18} />} />
          <MetricCard label="高风险" value={highRisk} icon={<Filter size={18} />} />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-950">排序方式</p>
            <Link href="/report" className="flex items-center gap-1 text-xs font-semibold text-[#1f4b99]"><FileText size={14} />深度报告</Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {preferences.map((item) => (
              <button key={item} type="button" onClick={() => state.setPreference(item)} className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold ${state.profile.preference === item ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 text-slate-600"}`}>{item}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {state.recommendations.map((recommendation) => (
            <JobCard key={recommendation.job.id} recommendation={recommendation} favorite={state.favorites.includes(recommendation.job.id)} inCompare={state.compare.includes(recommendation.job.id)} onToggleFavorite={state.toggleFavorite} onToggleCompare={state.toggleCompare} />
          ))}
        </div>
      </section>

      {state.compare.length >= 2 && (
        <div className="fixed inset-x-0 bottom-[76px] z-30 mx-auto max-w-[430px] px-5">
          <Link href="/compare" className="flex h-12 items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-400/40">
            对比 {state.compare.length} 个岗位
          </Link>
        </div>
      )}
    </MobileShell>
  );
}
