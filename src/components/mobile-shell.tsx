import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, ChartNoAxesColumnIncreasing, FileText, UserRound } from "lucide-react";
import { ReactNode } from "react";

const navItems = [
  { href: "/results", label: "岗位", icon: BriefcaseBusiness },
  { href: "/compare", label: "对比", icon: ChartNoAxesColumnIncreasing },
  { href: "/report", label: "报告", icon: FileText },
  { href: "/mine", label: "我的", icon: UserRound },
];

type MobileShellProps = {
  title?: string;
  subtitle?: string;
  backHref?: string;
  children: ReactNode;
  showNav?: boolean;
};

export function MobileShell({ title, subtitle, backHref, children, showNav = true }: MobileShellProps) {
  return (
    <main className="min-h-screen bg-[#e8edf3] text-slate-950">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[#f7f9fc] shadow-2xl shadow-slate-300/60">
        {(title || backHref) && (
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f7f9fc]/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              {backHref && (
                <Link
                  href={backHref}
                  className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
                  aria-label="返回"
                >
                  <ArrowLeft size={18} />
                </Link>
              )}
              <div className="min-w-0">
                {title && <h1 className="truncate text-base font-semibold text-slate-950">{title}</h1>}
                {subtitle && <p className="mt-0.5 truncate text-xs text-slate-500">{subtitle}</p>}
              </div>
            </div>
          </header>
        )}
        <div className={showNav ? "pb-24" : "pb-6"}>{children}</div>
        {showNav && (
          <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px] border-t border-slate-200 bg-white/95 px-4 pb-3 pt-2 backdrop-blur">
            <div className="grid grid-cols-4 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-[#1f4b99]"
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </main>
  );
}
