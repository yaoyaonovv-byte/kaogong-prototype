import { JobRecommendation } from "@/lib/types";
import { averageAdmissionScore, averageCompetition, latestHistory } from "@/lib/recommendations";
import { StatusBadge } from "./status-badge";

type CompareTableProps = {
  recommendations: JobRecommendation[];
};

const rows = [
  { label: "地区", value: (item: JobRecommendation) => `${item.job.city}` },
  { label: "层级", value: (item: JobRecommendation) => item.job.level },
  { label: "招录", value: (item: JobRecommendation) => `${latestHistory(item.job).hires} 人` },
  { label: "竞争", value: (item: JobRecommendation) => `${averageCompetition(item.job)}:1` },
  { label: "均分", value: (item: JobRecommendation) => averageAdmissionScore(item.job) },
  { label: "目标", value: (item: JobRecommendation) => item.targetScore },
];

export function CompareTable({ recommendations }: CompareTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
      <div className="grid" style={{ gridTemplateColumns: `88px repeat(${recommendations.length}, minmax(118px, 1fr))` }}>
        <div className="border-b border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-500">维度</div>
        {recommendations.map((item) => (
          <div key={item.job.id} className="border-b border-l border-slate-200 bg-slate-50 p-3">
            <p className="line-clamp-2 text-xs font-semibold leading-5 text-slate-950">{item.job.title}</p>
          </div>
        ))}
        <div className="border-b border-slate-200 p-3 text-xs font-semibold text-slate-500">结论</div>
        {recommendations.map((item) => (
          <div key={`${item.job.id}-risk`} className="border-b border-l border-slate-200 p-3">
            <StatusBadge value={item.risk} tone="risk" />
          </div>
        ))}
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <div className="border-b border-slate-200 p-3 text-xs font-semibold text-slate-500">{row.label}</div>
            {recommendations.map((item) => (
              <div key={`${item.job.id}-${row.label}`} className="border-b border-l border-slate-200 p-3 text-sm text-slate-700">
                {row.value(item)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
