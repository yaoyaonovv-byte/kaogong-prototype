"use client";

import Link from "next/link";
import { CompareTable } from "@/components/compare-table";
import { JobCard } from "@/components/job-card";
import { MobileShell } from "@/components/mobile-shell";
import { useJobState } from "@/hooks/use-job-state";

export default function ComparePage() {
  const state = useJobState();
  const selected = state.recommendations.filter((item) => state.compare.includes(item.job.id));
  const best = selected.slice().sort((a, b) => b.matchScore - a.matchScore)[0];

  return (
    <MobileShell title="岗位对比" subtitle="支持 2-5 个岗位" backHref="/results">
      <section className="space-y-4 px-5 py-5">
        {selected.length < 2 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-center">
            <p className="text-sm leading-6 text-slate-500">至少加入 2 个岗位后可以横向对比。</p>
            <Link href="/results" className="mt-4 flex h-11 items-center justify-center rounded-lg bg-[#1f4b99] text-sm font-semibold text-white">去选择岗位</Link>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-[#1f4b99]">优先建议</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{best?.job.title} 综合匹配度最高，可作为当前首选报考方向。</p>
            </div>
            <div className="overflow-x-auto"><CompareTable recommendations={selected} /></div>
          </>
        )}

        <div className="space-y-3">
          {selected.map((recommendation) => (
            <JobCard key={recommendation.job.id} recommendation={recommendation} favorite={state.favorites.includes(recommendation.job.id)} inCompare onToggleFavorite={state.toggleFavorite} onToggleCompare={state.toggleCompare} />
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
