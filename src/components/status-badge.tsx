import { CompetitionLevel, RecommendationType, RiskLevel } from "@/lib/types";

const riskClasses: Record<RiskLevel, string> = {
  稳妥: "border-emerald-200 bg-emerald-50 text-emerald-700",
  适中: "border-blue-200 bg-blue-50 text-blue-700",
  冲刺: "border-orange-200 bg-orange-50 text-orange-700",
  不建议: "border-red-200 bg-red-50 text-red-700",
};

const competitionClasses: Record<CompetitionLevel, string> = {
  低: "border-emerald-200 bg-emerald-50 text-emerald-700",
  中: "border-blue-200 bg-blue-50 text-blue-700",
  高: "border-orange-200 bg-orange-50 text-orange-700",
  极高: "border-red-200 bg-red-50 text-red-700",
};

const typeClasses: Record<RecommendationType, string> = {
  保底岗: "border-emerald-200 bg-emerald-50 text-emerald-700",
  稳妥岗: "border-blue-200 bg-blue-50 text-blue-700",
  冲刺岗: "border-orange-200 bg-orange-50 text-orange-700",
  机会岗: "border-violet-200 bg-violet-50 text-violet-700",
};

type StatusBadgeProps = {
  value: RiskLevel | CompetitionLevel | RecommendationType | string;
  tone?: "risk" | "competition" | "type" | "neutral";
};

export function StatusBadge({ value, tone = "neutral" }: StatusBadgeProps) {
  const className =
    tone === "risk"
      ? riskClasses[value as RiskLevel]
      : tone === "competition"
        ? competitionClasses[value as CompetitionLevel]
        : tone === "type"
          ? typeClasses[value as RecommendationType]
          : "border-slate-200 bg-slate-50 text-slate-600";

  return <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${className}`}>{value}</span>;
}
