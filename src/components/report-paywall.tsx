import { Check, LockKeyhole, Sparkles } from "lucide-react";

const freeItems = ["可报岗位数量", "Top 3 推荐岗位", "基础匹配分", "简要风险等级"];
const paidItems = ["完整岗位列表", "近 3-5 年趋势分析", "冲稳保岗位组合", "目标分建议", "报告长图/PDF 结构"];

type ReportPaywallProps = {
  unlocked: boolean;
  onUnlock?: () => void;
};

export function ReportPaywall({ unlocked, onUnlock }: ReportPaywallProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1f4b99] text-white">
          {unlocked ? <Sparkles size={20} /> : <LockKeyhole size={20} />}
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-950">{unlocked ? "深度报告已解锁" : "解锁个人选岗报告"}</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">完整分析岗位趋势、竞争压力和冲稳保组合。</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-sm font-semibold text-slate-950">免费版</p>
          <ul className="mt-3 space-y-2 text-xs text-slate-500">
            {freeItems.map((item) => (
              <li key={item} className="flex gap-2">
                <Check size={14} className="shrink-0 text-slate-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-[#1f4b99] bg-blue-50 p-3">
          <p className="text-sm font-semibold text-[#1f4b99]">付费版</p>
          <ul className="mt-3 space-y-2 text-xs text-slate-700">
            {paidItems.map((item) => (
              <li key={item} className="flex gap-2">
                <Check size={14} className="shrink-0 text-[#1f4b99]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!unlocked && (
        <button
          type="button"
          onClick={onUnlock}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-[#1f4b99] text-sm font-semibold text-white shadow-sm shadow-blue-900/20"
        >
          29.9 元解锁深度报告
        </button>
      )}
    </section>
  );
}
