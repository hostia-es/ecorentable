import { useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, Sparkles } from "lucide-react";
import { runSeoChecks, seoSummary, type SeoCheck } from "@/lib/seoChecks";

interface Props {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    image_url: string;
    category: string;
  };
}

export default function SeoValidationPanel({ post }: Props) {
  const [open, setOpen] = useState(true);
  const checks = useMemo(() => runSeoChecks(post), [post]);
  const summary = useMemo(() => seoSummary(checks), [checks]);

  const ringColor =
    summary.score >= 85 ? "hsl(148,72%,55%)" : summary.score >= 60 ? "hsl(38,92%,55%)" : "hsl(0,84%,60%)";

  const grouped = {
    fail: checks.filter((c) => c.status === "fail"),
    warn: checks.filter((c) => c.status === "warn"),
    pass: checks.filter((c) => c.status === "pass"),
  };

  return (
    <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: "hsl(210 25% 7%)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-4 hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(0 0% 100% / 0.08)" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.5" fill="none" stroke={ringColor} strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${(summary.score / 100) * 97.4} 97.4`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: ringColor }}>
              {summary.score}
            </span>
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <Sparkles size={13} className="text-[hsl(148,72%,55%)]" /> Validación SEO
            </h3>
            <p className="text-[11px] text-white/50">
              {summary.pass} ok · {summary.warn} avisos · {summary.fail} errores
            </p>
          </div>
        </div>
        <ChevronDown size={16} className={`text-white/40 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-white/5">
          {!summary.canPublish && (
            <div className="px-4 py-2.5 text-[11px] flex items-center gap-2 border-b border-white/5"
              style={{ background: "hsl(0 84% 60% / 0.1)", color: "hsl(0 84% 75%)" }}>
              <XCircle size={13} /> Resuelve los errores antes de publicar.
            </div>
          )}
          {summary.canPublish && summary.warn === 0 && (
            <div className="px-4 py-2.5 text-[11px] flex items-center gap-2 border-b border-white/5"
              style={{ background: "hsl(148 72% 45% / 0.1)", color: "hsl(148 72% 70%)" }}>
              <CheckCircle2 size={13} /> ¡Listo para publicar!
            </div>
          )}

          <ul className="divide-y divide-white/5 max-h-[420px] overflow-y-auto">
            {[...grouped.fail, ...grouped.warn, ...grouped.pass].map((c) => (
              <CheckRow key={c.id} c={c} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CheckRow({ c }: { c: SeoCheck }) {
  const Icon = c.status === "pass" ? CheckCircle2 : c.status === "warn" ? AlertTriangle : XCircle;
  const color =
    c.status === "pass" ? "hsl(148,72%,55%)" : c.status === "warn" ? "hsl(38,92%,60%)" : "hsl(0,84%,65%)";
  return (
    <li className="px-4 py-2.5 flex gap-2.5 items-start">
      <Icon size={14} style={{ color, marginTop: 2 }} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-white/90">{c.label}</div>
        <div className="text-[11px] text-white/50 leading-snug">{c.message}</div>
        {c.fix && <div className="text-[10px] text-white/40 mt-0.5 italic">→ {c.fix}</div>}
      </div>
    </li>
  );
}
