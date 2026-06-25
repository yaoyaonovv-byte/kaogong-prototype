import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, ClipboardList, SearchCheck } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";

const steps = [
  { icon: ClipboardList, label: "录入条件", text: "专业、学历、地区、政治面貌" },
  { icon: SearchCheck, label: "智能匹配", text: "筛掉不可报，标记临界风险" },
  { icon: BarChart3, label: "趋势决策", text: "结合 3-5 年竞争和分数" },
];

export default function Home() {
  return (
    <MobileShell showNav={false}>
      <section className="px-5 pb-6 pt-8">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <div className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#1f4b99]">
            <BadgeCheck size={14} />
            国考 + 省考选岗决策原型
          </div>
          <h1 className="mt-5 text-3xl font-semibold leading-10 tracking-tight text-slate-950">
            输入你的条件，找到更适合报考的公务员岗位
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            用专业、学历、地区等条件先判断能不能报，再结合近年招录人数、竞争比和进面分，给出冲稳保推荐。
          </p>
          <Link
            href="/match"
            className="mt-6 flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1f4b99] text-sm font-semibold text-white shadow-sm shadow-blue-900/20"
          >
            开始智能匹配
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/report"
            className="mt-3 flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700"
          >
            查看示例报告
          </Link>
        </div>
      </section>

      <section className="px-5">
        <div className="grid gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#1f4b99]">
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-950">{step.label}</h2>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </MobileShell>
  );
}
