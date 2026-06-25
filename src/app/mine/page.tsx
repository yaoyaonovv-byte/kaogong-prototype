"use client";

import Link from "next/link";
import { Bell, FileCheck2, Star } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { MetricCard } from "@/components/metric-card";
import { MobileShell } from "@/components/mobile-shell";
import { useJobState } from "@/hooks/use-job-state";

export default function MinePage() {
  const state = useJobState();
  const favoriteJobs = state.recommendations.filter((item) => state.favorites.includes(item.job.id));

  return (
    <MobileShell title="我的岗位" subtitle="收藏、对比和报告" backHref="/results">
      <section className="space-y-4 px-5 py-5">
        <div className="grid grid-cols-3 gap-2">
          <MetricCard label="收藏" value={state.favorites.length} icon={<Star size={18} />} />
          <MetricCard label="对比" value={state.compare.length} icon={<Bell size={18} />} />
          <MetricCard label="报告" value={state.reportUnlocked ? "已购" : "未购"} icon={<FileCheck2 size={18} />} />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-950">提醒设置</h2>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            {['公告发布提醒', '报名截止提醒', '收藏岗位竞争变化'].map((item) => (
              <label key={item} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                {item}
                <input type="checkbox" defaultChecked className="size-4 accent-[#1f4b99]" />
              </label>
            ))}
          </div>
        </div>

        {favoriteJobs.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-center">
            <p className="text-sm leading-6 text-slate-500">还没有收藏岗位。</p>
            <Link href="/results" className="mt-4 flex h-11 items-center justify-center rounded-lg bg-[#1f4b99] text-sm font-semibold text-white">去看推荐</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteJobs.map((recommendation) => (
              <JobCard key={recommendation.job.id} recommendation={recommendation} favorite inCompare={state.compare.includes(recommendation.job.id)} onToggleFavorite={state.toggleFavorite} onToggleCompare={state.toggleCompare} />
            ))}
          </div>
        )}
      </section>
    </MobileShell>
  );
}
