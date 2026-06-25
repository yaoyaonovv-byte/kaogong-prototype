import Link from "next/link";
import { Bookmark, GitCompareArrows, MapPin } from "lucide-react";
import { JobRecommendation } from "@/lib/types";
import { averageCompetition, latestHistory } from "@/lib/recommendations";
import { StatusBadge } from "./status-badge";

type JobCardProps = {
  recommendation: JobRecommendation;
  favorite?: boolean;
  inCompare?: boolean;
  onToggleFavorite?: (id: string) => void;
  onToggleCompare?: (id: string) => void;
};

export function JobCard({ recommendation, favorite, inCompare, onToggleFavorite, onToggleCompare }: JobCardProps) {
  const { job } = recommendation;
  const latest = latestHistory(job);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <StatusBadge value={recommendation.type} tone="type" />
            <StatusBadge value={recommendation.risk} tone="risk" />
          </div>
          <Link href={`/jobs/${job.id}`} className="block text-base font-semibold leading-6 text-slate-950 hover:text-[#1f4b99]">
            {job.title}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{job.agency}</p>
        </div>
        <div className="rounded-lg bg-[#1f4b99] px-2.5 py-2 text-center text-white">
          <p className="text-lg font-semibold leading-none">{recommendation.matchScore}</p>
          <p className="mt-1 text-[10px]">匹配</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
        <MapPin size={14} />
        <span>{job.exam} · {job.city} · {job.level}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="text-sm font-semibold text-slate-950">{latest.hires}</p>
          <p className="mt-1 text-[11px] text-slate-500">招录人数</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="text-sm font-semibold text-slate-950">{averageCompetition(job)}:1</p>
          <p className="mt-1 text-[11px] text-slate-500">近年竞争</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="text-sm font-semibold text-slate-950">{recommendation.targetScore}</p>
          <p className="mt-1 text-[11px] text-slate-500">目标分</p>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">{recommendation.reasons[0] ?? "条件整体可报，建议结合公告原文复核。"}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onToggleFavorite?.(job.id)}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold ${favorite ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 bg-white text-slate-700"}`}
        >
          <Bookmark size={16} fill={favorite ? "currentColor" : "none"} />
          {favorite ? "已收藏" : "收藏"}
        </button>
        <button
          type="button"
          onClick={() => onToggleCompare?.(job.id)}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold ${inCompare ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 bg-white text-slate-700"}`}
        >
          <GitCompareArrows size={16} />
          {inCompare ? "已加入" : "加入对比"}
        </button>
      </div>
    </article>
  );
}
