"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { defaultProfile } from "@/lib/data";
import { saveProfile } from "@/lib/storage";
import { CandidateProfile, Education, ExamScope, Preference } from "@/lib/types";

const educations: Education[] = ["专科", "本科", "硕士", "博士"];
const scopes: ExamScope[] = ["全部", "国考", "省考"];
const preferences: Preference[] = ["综合推荐", "上岸概率", "地区优先", "岗位质量", "冷门机会"];
const regionOptions = ["广东", "北京", "浙江", "上海", "重庆"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export default function MatchPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<CandidateProfile>(defaultProfile);

  function update<K extends keyof CandidateProfile>(key: K, value: CandidateProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function toggleRegion(region: string) {
    const regions = profile.regions.includes(region)
      ? profile.regions.filter((item) => item !== region)
      : [...profile.regions, region];
    update("regions", regions);
  }

  function submit() {
    saveProfile(profile);
    router.push("/results");
  }

  return (
    <MobileShell title="智能匹配" subtitle="3 步生成岗位推荐" backHref="/" showNav={false}>
      <section className="px-5 py-5">
        <div className="mb-5 grid grid-cols-3 gap-2">
          {["基础信息", "报考限制", "报考偏好"].map((label, index) => (
            <div key={label} className={`rounded-lg border p-3 text-center text-xs font-semibold ${index === step ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 bg-white text-slate-400"}`}>
              {index + 1}. {label}
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
          {step === 0 && (
            <div className="space-y-4">
              <Field label="学历">
                <div className="grid grid-cols-4 gap-2">
                  {educations.map((item) => (
                    <button key={item} type="button" onClick={() => update("education", item)} className={`h-10 rounded-lg border text-sm font-semibold ${profile.education === item ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 text-slate-600"}`}>{item}</button>
                  ))}
                </div>
              </Field>
              <Field label="专业">
                <input value={profile.major} onChange={(event) => update("major", event.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#1f4b99]" placeholder="例如：计算机科学与技术" />
              </Field>
              <Field label="毕业年份">
                <input value={profile.graduationYear} onChange={(event) => update("graduationYear", event.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#1f4b99]" />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <Field label="政治面貌">
                <select value={profile.politicalStatus} onChange={(event) => update("politicalStatus", event.target.value as CandidateProfile["politicalStatus"])} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#1f4b99]">
                  {['不限', '群众', '共青团员', '中共党员'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
              <Field label="户籍 / 生源地">
                <div className="grid grid-cols-2 gap-2">
                  <input value={profile.household} onChange={(event) => update("household", event.target.value)} className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#1f4b99]" placeholder="户籍" />
                  <input value={profile.hometown} onChange={(event) => update("hometown", event.target.value)} className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#1f4b99]" placeholder="生源地" />
                </div>
              </Field>
              <Field label="基层工作年限">
                <input value={profile.grassrootsYears} onChange={(event) => update("grassrootsYears", event.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#1f4b99]" />
              </Field>
              <button type="button" onClick={() => update("serviceProject", !profile.serviceProject)} className={`flex h-11 w-full items-center justify-between rounded-lg border px-3 text-sm font-semibold ${profile.serviceProject ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 text-slate-600"}`}>
                服务基层项目经历
                {profile.serviceProject && <Check size={18} />}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Field label="考试范围">
                <div className="grid grid-cols-3 gap-2">
                  {scopes.map((item) => (
                    <button key={item} type="button" onClick={() => update("examScope", item)} className={`h-10 rounded-lg border text-sm font-semibold ${profile.examScope === item ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 text-slate-600"}`}>{item}</button>
                  ))}
                </div>
              </Field>
              <Field label="意向地区">
                <div className="flex flex-wrap gap-2">
                  {regionOptions.map((item) => (
                    <button key={item} type="button" onClick={() => toggleRegion(item)} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${profile.regions.includes(item) ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 text-slate-600"}`}>{item}</button>
                  ))}
                </div>
              </Field>
              <Field label="推荐偏好">
                <div className="grid gap-2">
                  {preferences.map((item) => (
                    <button key={item} type="button" onClick={() => update("preference", item)} className={`h-10 rounded-lg border text-sm font-semibold ${profile.preference === item ? "border-[#1f4b99] bg-blue-50 text-[#1f4b99]" : "border-slate-200 text-slate-600"}`}>{item}</button>
                  ))}
                </div>
              </Field>
            </div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))} className="h-12 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 disabled:opacity-40">上一步</button>
          <button type="button" onClick={step === 2 ? submit : () => setStep((value) => value + 1)} className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1f4b99] text-sm font-semibold text-white">
            {step === 2 ? "生成匹配结果" : "下一步"}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </MobileShell>
  );
}
