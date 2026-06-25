import { HistoricalStat } from "@/lib/types";

type TrendChartProps = {
  data: HistoricalStat[];
  metric: "competitionRatio" | "admissionScore" | "hires";
  label: string;
};

export function TrendChart({ data, metric, label }: TrendChartProps) {
  const values = data.map((item) => item[metric]);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);
  const points = values
    .map((value, index) => {
      const x = 18 + index * (264 / Math.max(values.length - 1, 1));
      const y = 90 - ((value - min) / range) * 58;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-950">{label}</h2>
        <p className="text-xs text-slate-500">近 {data.length} 年</p>
      </div>
      <svg viewBox="0 0 300 118" className="mt-3 h-32 w-full overflow-visible" role="img" aria-label={label}>
        <line x1="18" y1="92" x2="282" y2="92" stroke="#dbe3ee" strokeWidth="1" />
        <line x1="18" y1="28" x2="282" y2="28" stroke="#eef2f7" strokeWidth="1" />
        <polyline points={points} fill="none" stroke="#1f4b99" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((item, index) => {
          const value = item[metric];
          const x = 18 + index * (264 / Math.max(values.length - 1, 1));
          const y = 90 - ((value - min) / range) * 58;
          return (
            <g key={item.year}>
              <circle cx={x} cy={y} r="4" fill="#ffffff" stroke="#1f4b99" strokeWidth="2" />
              <text x={x} y="111" textAnchor="middle" className="fill-slate-500 text-[10px]">
                {item.year}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
        <span>最低 {min}</span>
        <span className="text-center">最新 {values[values.length - 1]}</span>
        <span className="text-right">最高 {max}</span>
      </div>
    </section>
  );
}
