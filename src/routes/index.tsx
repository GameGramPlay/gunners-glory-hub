import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LiveTranslate } from "@/components/LiveTranslate";

export const Route = createFileRoute("/")({
  component: Index,
});

type SectionKey =
  | "overview"
  | "live"
  | "broadcast"
  | "standings"
  | "schedule"
  | "squad"
  | "media"
  | "honours";

const sections: { key: SectionKey; label: string; group: string }[] = [
  { key: "overview", label: "Overview", group: "Club" },
  { key: "live", label: "Live Score", group: "Match" },
  { key: "broadcast", label: "Broadcast", group: "Match" },
  { key: "standings", label: "Standings", group: "Season" },
  { key: "schedule", label: "Schedule", group: "Season" },
  { key: "squad", label: "Squad", group: "Team" },
  { key: "media", label: "Media", group: "Team" },
  { key: "honours", label: "Honours", group: "Legacy" },
];

const standings = [
  { pos: 1, club: "Manchester City", p: 36, gd: "+54", pts: 84 },
  { pos: 2, club: "Arsenal", p: 36, gd: "+51", pts: 83, highlight: true },
  { pos: 3, club: "Liverpool", p: 36, gd: "+38", pts: 76 },
  { pos: 4, club: "Chelsea", p: 36, gd: "+22", pts: 68 },
  { pos: 5, club: "Newcastle United", p: 36, gd: "+19", pts: 64 },
];

const schedule = [
  { date: "May 10, 2026", match: "West Ham United vs Arsenal", comp: "Premier League", status: "0 — 1", tone: "win" },
  { date: "May 18, 2026", match: "Arsenal vs Burnley", comp: "Premier League", status: "1 — 0", tone: "win" },
  { date: "May 24, 2026", match: "Crystal Palace vs Arsenal", comp: "Premier League", status: "16:00", tone: "up" },
  { date: "May 30, 2026", match: "Arsenal vs Paris Saint-Germain", comp: "UCL Final", status: "12:00", tone: "up" },
];

const squad = [
  { num: 1, init: "DR", name: "David Raya", role: "Goalkeeper", s1: ["Apps", "35"], s2: ["CS", "16"] },
  { num: 2, init: "WS", name: "William Saliba", role: "Defender", s1: ["Goals", "2"], s2: ["Tackles", "68"] },
  { num: 8, init: "MO", name: "Martin Ødegaard", role: "Midfielder (C)", s1: ["Goals", "9"], s2: ["Assists", "13"] },
  { num: 7, init: "BS", name: "Bukayo Saka", role: "Forward", s1: ["Goals", "18"], s2: ["Assists", "11"] },
];

const honours = [
  { comp: "Premier League / First Division", t: 13 },
  { comp: "FA Cup (Record Holders)", t: 14 },
  { comp: "League Cup (EFL Cup)", t: 2 },
  { comp: "FA Community Shield", t: 17 },
  { comp: "European Cup Winners' Cup", t: 1 },
];

const media = [
  {
    title: "Latest official highlights",
    meta: "Arsenal Official YouTube",
    src: "https://www.youtube-nocookie.com/embed/videoseries?list=UULFpryVRk_VDudG8SHXgWcG0w",
  },
  {
    title: "Goals & analysis",
    meta: "Match analysis playlist",
    src: "https://www.youtube-nocookie.com/embed/videoseries?list=PLn-zM3GbWdf4M-IRzZK4P2icbVdpdEoau",
  },
];

function Cannon({ className = "h-7 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="currentColor" aria-hidden>
      <circle cx="14" cy="20" r="7" />
      <rect x="18" y="14" width="38" height="10" rx="2" transform="rotate(-8 18 14)" />
      <rect x="6" y="26" width="52" height="3" rx="1.5" />
    </svg>
  );
}

function PanelHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Index() {
  const [active, setActive] = useState<SectionKey>("overview");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3 text-primary">
            <Cannon className="h-6 w-12" />
            <div className="leading-tight">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground">Arsenal FC</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Est. 1886</p>
            </div>
          </div>
          <LiveTranslate />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[240px_1fr]">
        {/* Sidebar nav */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <nav className="rounded-2xl border border-border bg-card p-3" style={{ boxShadow: "var(--shadow-card)" }}>
            {Array.from(new Set(sections.map((s) => s.group))).map((group) => (
              <div key={group} className="mb-3 last:mb-0">
                <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{group}</p>
                <ul className="space-y-0.5">
                  {sections.filter((s) => s.group === group).map((s) => (
                    <li key={s.key}>
                      <button
                        onClick={() => setActive(s.key)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                          active === s.key
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground/80 hover:bg-secondary"
                        }`}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content panel */}
        <section className="min-w-0">
          {active === "overview" && (
            <div>
              <div className="relative mb-8 overflow-hidden rounded-3xl text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)" }} />
                <div className="relative px-8 py-14 md:px-12 md:py-20">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">The Gunners</p>
                  <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight md:text-6xl">Arsenal Football Club</h1>
                  <p className="mt-4 text-base text-primary-foreground/80 md:text-lg">Victoria Concordia Crescit — Victory Through Harmony.</p>
                </div>
              </div>
              <PanelHeader eyebrow="Heritage" title="Club History" />
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Founded in 1886 by workers in Woolwich, Arsenal has grown into one of the most successful and influential clubs in English football. Originally named Dial Square, the club moved north to Highbury and shortened its name to Arsenal FC.
                </p>
                <p>
                  Famous for its rich traditions, including the legendary{" "}
                  <span className="font-semibold text-foreground">"Invincibles"</span> 2003–2004 season — an entire Premier League campaign unbeaten under Arsène Wenger.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[{l: "Founded", v: "1886"}, {l: "Home", v: "Emirates Stadium"}, {l: "Capacity", v: "60,704"}].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
                    <p className="mt-1 font-display text-2xl font-bold text-foreground">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "live" && (
            <div>
              <PanelHeader eyebrow="Match Live" title="Live Score" sub="Simulated tracking environment syncing game-state metrics." />
              <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-elegant)" }}>
                <div className="flex items-center justify-between bg-primary px-6 py-3 text-primary-foreground">
                  <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                    </span>
                    Premier League • Live
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">Matchday 37</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 p-10">
                  <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Crystal Palace</p>
                    <p className="mt-2 font-display text-6xl font-bold text-foreground">0</p>
                  </div>
                  <div className="text-center font-display text-3xl text-muted-foreground">—</div>
                  <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">Arsenal</p>
                    <p className="mt-2 font-display text-6xl font-bold text-primary">0</p>
                  </div>
                </div>
                <div className="border-t border-border bg-secondary/40 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  24' Minute
                </div>
              </div>
            </div>
          )}

          {active === "broadcast" && (
            <div>
              <PanelHeader eyebrow="Watch Live" title="Broadcast" sub="Live stream embedded from SportSurge. beIN Connect blocks iframe embedding — open it in a new tab for HD multilingual commentary." />
              <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src="https://sportsurge.club/arsenal-fc-live-stream/"
                    title="Arsenal FC — Live stream (SportSurge)"
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4 text-sm">
                  <span className="text-muted-foreground">SportSurge embedded player • unofficial mirror</span>
                  <a
                    href="https://www.beinconnect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
                  >
                    Open beIN Connect
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {active === "standings" && (
            <div>
              <PanelHeader eyebrow="Table" title="Premier League — Top 5" />
              <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
                <table className="w-full text-left">
                  <thead className="bg-secondary/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3">Pos</th>
                      <th className="px-6 py-3">Club</th>
                      <th className="px-6 py-3 text-center">P</th>
                      <th className="px-6 py-3 text-center">GD</th>
                      <th className="px-6 py-3 text-right">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((r) => (
                      <tr key={r.pos} className={`border-t border-border ${r.highlight ? "bg-primary/5" : ""}`}>
                        <td className="px-6 py-4 font-bold">{r.pos}</td>
                        <td className={`px-6 py-4 font-semibold ${r.highlight ? "text-primary" : "text-foreground"}`}>{r.club}</td>
                        <td className="px-6 py-4 text-center text-muted-foreground">{r.p}</td>
                        <td className="px-6 py-4 text-center text-muted-foreground">{r.gd}</td>
                        <td className="px-6 py-4 text-right font-bold">{r.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "schedule" && (
            <div>
              <PanelHeader eyebrow="Fixtures" title="Match Schedule" />
              <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Match</th>
                      <th className="px-6 py-3 hidden md:table-cell">Competition</th>
                      <th className="px-6 py-3 text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((s) => (
                      <tr key={s.date} className="border-t border-border">
                        <td className="px-6 py-4 font-medium text-foreground">{s.date}</td>
                        <td className="px-6 py-4 text-foreground">{s.match}</td>
                        <td className="px-6 py-4 hidden text-muted-foreground md:table-cell">{s.comp}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${s.tone === "win" ? "bg-[var(--success)]/15 text-[var(--success)]" : "bg-accent text-accent-foreground"}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "squad" && (
            <div>
              <PanelHeader eyebrow="Players" title="First Team Squad" />
              <div className="grid gap-5 sm:grid-cols-2">
                {squad.map((p) => (
                  <div key={p.num} className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-card)" }}>
                    <div className="relative bg-gradient-to-br from-primary to-[var(--navy)] p-6 text-primary-foreground">
                      <span className="absolute right-4 top-3 font-display text-4xl font-bold opacity-30">#{p.num}</span>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-lg font-bold backdrop-blur">{p.init}</div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                      <p className="text-sm font-medium text-primary">{p.role}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-center">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.s1[0]}</p>
                          <p className="font-display text-xl font-bold text-foreground">{p.s1[1]}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.s2[0]}</p>
                          <p className="font-display text-xl font-bold text-foreground">{p.s2[1]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "media" && (
            <div>
              <PanelHeader eyebrow="Watch" title="Media Hub" />
              <div className="grid gap-6 md:grid-cols-2">
                {media.map((m) => (
                  <div key={m.title} className="group overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
                    <div className="relative aspect-video w-full bg-black">
                      <iframe
                        src={m.src}
                        title={m.title}
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{m.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "honours" && (
            <div>
              <PanelHeader eyebrow="Trophies" title="Club Honours" />
              <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
                <table className="w-full text-left">
                  <thead className="bg-secondary/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3">Competition</th>
                      <th className="px-6 py-3 text-right">Titles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {honours.map((h) => (
                      <tr key={h.comp} className="border-t border-border">
                        <td className="px-6 py-4 font-medium text-foreground">{h.comp}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-primary px-3 font-bold text-primary-foreground">{h.t}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>

      <footer className="border-t border-border bg-[var(--navy)] py-10 text-center text-sm text-primary-foreground/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-3 flex justify-center text-primary-foreground/90"><Cannon /></div>
          <p>© 2026 Arsenal Dashboard — unofficial fan project, not affiliated with Arsenal FC or beIN Media Group.</p>
          <p className="mt-2 text-primary-foreground/60">
            Crafted by <span className="font-bold text-[var(--gold)]">Luigi</span>.
          </p>
        </div>
      </footer>
    </main>
  );
}