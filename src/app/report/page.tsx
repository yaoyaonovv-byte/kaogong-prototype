"use client";

import { FileText, Target, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { MobileShell } from "@/components/mobile-shell";
import { ReportPaywall } from "@/components/report-paywall";
import { TrendChart } from "@/components/trend-chart";
import { useJobState } from "@/hooks/use-job-state";

export default function ReportPage() {
  const state = useJobState();
  const top = state.recommendations[0];
  const stable = state.recommendations.filter((item) => item.risk === "稳妥" || item.risk === "适中");

  return (
    <MobileShell title="深度报告" subtitle="冲稳保组合建议" backHref="/results">
      <section className="space-y-4 px-5 py-5">
        <ReportPaywall unlocked={state.reportUnlocked} onUnlock={state.unlockReport} />

        <div className="grid grid-cols-3 gap-2">
          <MetricCard label="完整岗位" value={state.reportUnlocked ? state.recommendations.length : 3} icon={<FileText size={18} />} />
          <MetricCard label="稳妥组合" value={stable.length} icon={<Target size={18} />} />
          <MetricCard label="建议目标" value={top?.targetScore ?? "-"} icon={<TrendingUp size={18} />} />
        </div>

        {top && <TrendChart data={top.job.history} metric="competitionRatio" label={`${top.job.title} · 竞争趋势`} />}

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-950">冲稳保组合</h2>
          <div className="mt-3 space-y-3">
            {state.recommendations.slice(0, state.reportUnlocked ? 5 : 3).map((item) => (
              <div key={item.job.id} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-950">{item.job.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.type} · {item.job.city}</p>
                </div>
                <div className="text-right text-sm font-semibold text-[#1f4b99]">{item.matchScore}</div>
              </div>
            ))}
          </div>
          {!state.reportUnlocked && <p className="mt-3 text-xs leading-5 text-slate-500">解锁后可查看完整岗位列表、风险解释和目标分拆解。</p>}
        </div>
      </section>
    </MobileShell>
  );
}
