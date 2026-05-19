import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LiveTranslate } from "@/components/LiveTranslate";

export const Route = createFileRoute("/")({
  component: Index,
});

const navItems = ["History", "Stadium", "Live Center", "Broadcast", "Standings", "Media", "Schedule", "Squad", "Honours"];

const stadiumTabs = {
  Overview: {
    title: "Emirates Stadium Overview",
    body: "Opened in 2006 in Holloway, London, featuring a capacity of over 60,000 spectators.",
  },
  "The Pitch": {
    title: "The Pitch",
    body: "A meticulously maintained 105m × 68m playing surface, designed for fast, fluid attacking football.",
  },
  "North Bank": {
    title: "The North Bank",
    body: "Home of the loudest Gunners — the spiritual heart of the Emirates, carrying the spirit of Highbury.",
  },
  "The Armoury": {
    title: "The Armoury",
    body: "The flagship club store packed with kits, memorabilia, and exclusive Arsenal merchandise.",
  },
} as const;

type StadiumKey = keyof typeof stadiumTabs;

const standings = [
  { pos: 1, club: "Manchester City", p: 36, gd: "+54", pts: 84 },
  { pos: 2, club: "Arsenal", p: 36, gd: "+51", pts: 83, highlight: true },
  { pos: 3, club: "Liverpool", p: 36, gd: "+38", pts: 76 },
  { pos: 4, club: "Chelsea", p: 36, gd: "+22", pts: 68 },
  { pos: 5, club: "Newcastle United", p: 36, gd: "+19", pts: 64 },
];

const schedule = [
  { date: "May 10, 2026", match: "West Ham United vs Arsenal", comp: "Premier League", status: "0 - 1 (Win)", tone: "win" },
  { date: "May 18, 2026", match: "Arsenal vs Burnley", comp: "Premier League", status: "1 - 0 (Win)", tone: "win" },
  { date: "May 24, 2026", match: "Crystal Palace vs Arsenal", comp: "Premier League", status: "16:00 (Upcoming)", tone: "up" },
  { date: "May 30, 2026", match: "Arsenal vs Paris Saint-Germain", comp: "UEFA Champions League Final", status: "12:00 PM (Upcoming)", tone: "up" },
];

const squad = [
  { num: 1, init: "DR", name: "David Raya", role: "Goalkeeper", s1: ["Apps", "35"], s2: ["CS", "16"] },
  { num: 2, init: "WS", name: "William Saliba", role: "Defender", s1: ["Goals", "2"], s2: ["Tackles", "68"] },
  { num: 8, init: "MO", name: "Martin Ødegaard", role: "Midfielder (C)", s1: ["Goals", "9"], s2: ["Assists", "13"] },
  { num: 7, init: "BS", name: "Bukayo Saka", role: "Forward", s1: ["Goals", "18"], s2: ["Assists", "11"] },
];

const honours = [
  { comp: "First Division / Premier League", t: 13 },
  { comp: "FA Cup (Record Holders)", t: 14 },
  { comp: "League Cup (EFL Cup)", t: 2 },
  { comp: "FA Community Shield", t: 17 },
  { comp: "European Cup Winners' Cup", t: 1 },
];

const media = [
  {
    title: "Arsenal — Latest official highlights",
    meta: "Premier League • Official channel",
    src: "https://www.youtube-nocookie.com/embed/videoseries?list=UULFpryVRk_VDudG8SHXgWcG0w",
  },
  {
    title: "Arsenal — Goals & analysis playlist",
    meta: "Match analysis • Official channel",
    src: "https://www.youtube-nocookie.com/embed/videoseries?list=PLn-zM3GbWdf4M-IRzZK4P2icbVdpdEoau",
  },
];

function Cannon() {
  return (
    <svg viewBox="0 0 64 32" className="h-8 w-16" fill="currentColor" aria-hidden>
      <circle cx="14" cy="20" r="7" />
      <rect x="18" y="14" width="38" height="10" rx="2" transform="rotate(-8 18 14)" />
      <rect x="6" y="26" width="52" height="3" rx="1.5" />
    </svg>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border/60 py-16">
      <div className="mx-auto max-w-6xl px-6">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
        <h2 className="mb-8 text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Index() {
  const [tab, setTab] = useState<StadiumKey>("Overview");
  const active = stadiumTabs[tab];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header className="relative overflow-hidden text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)" }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 text-primary-foreground/90">
            <Cannon />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Est. 1886</span>
          </div>
          <h1 className="mt-6 text-5xl font-bold uppercase tracking-tight md:text-7xl">Arsenal Football Club</h1>
          <p className="mt-4 text-lg font-medium text-primary-foreground/80 md:text-xl">
            The Gunners <span className="mx-2 text-[var(--gold)]">•</span> Victoria Concordia Crescit
          </p>
          <div className="mt-8">
            <LiveTranslate />
          </div>
        </div>
        <nav className="relative border-t border-white/10 bg-black/20 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-1 overflow-x-auto px-6 py-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground/80 transition hover:bg-white/10 hover:text-primary-foreground"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <Section id="history" eyebrow="Heritage" title="Club History">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            Founded in 1886 by workers in Woolwich, Arsenal Football Club has grown into one of the most successful and influential teams in English football history. Originally named Dial Square, the club later became known as Woolwich Arsenal, before moving north to Highbury and shortening the name to Arsenal FC.
          </p>
          <p>
            The club is famous for its rich traditions, including the legendary <span className="font-semibold text-foreground">"Invincibles"</span> season of 2003-2004, where they went an entire Premier League campaign undefeated under manager Arsène Wenger.
          </p>
        </div>
      </Section>

      <Section id="stadium" eyebrow="Home Ground" title="The Stadium Hub">
        <p className="mb-6 text-muted-foreground">Explore different aspects of the world-class Emirates Stadium using the interactive panel below:</p>
        <div className="overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="border-b border-border bg-secondary/60 p-6">
            <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground">{active.title}</h3>
            <p className="mt-2 text-muted-foreground">{active.body}</p>
          </div>
          <div className="flex flex-wrap gap-2 p-4">
            {(Object.keys(stadiumTabs) as StadiumKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                  tab === k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section id="live-center" eyebrow="Live" title="Live Scores Widget">
        <p className="mb-6 text-muted-foreground">Simulated tracking environment syncing game-state metrics:</p>
        <div className="overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-elegant)" }}>
          <div className="flex items-center justify-between bg-primary px-6 py-3 text-primary-foreground">
            <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
              </span>
              Premier League • Match Live
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">Matchday 37</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4 p-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Crystal Palace</p>
              <p className="mt-2 text-5xl font-bold text-foreground">0</p>
            </div>
            <div className="text-center text-3xl font-bold text-muted-foreground">—</div>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">ARSENAL</p>
              <p className="mt-2 text-5xl font-bold text-primary">0</p>
            </div>
          </div>
          <div className="border-t border-border bg-secondary/50 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Match Live (24' Minute)
          </div>
        </div>
      </Section>

      <Section id="broadcast" eyebrow="Watch Live" title="Broadcast & Live Translations">
        <p className="mb-6 text-muted-foreground">
          beIN Connect doesn't allow direct embedding (their servers refuse iframe loads). Launch the live stream in a new tab, or watch official Arsenal live content below — the entire page also translates live into 8 languages from the buttons in the header.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          <a
            href="https://www.beinconnect.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> beIN Connect
              </div>
              <h3 className="text-xl font-bold text-foreground">Open the live match stream</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Subscribers can watch every Arsenal Premier League and UCL fixture in HD with multi-language commentary on beIN Connect.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-primary">
              Launch stream
              <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <div className="overflow-hidden rounded-2xl border border-border bg-card lg:col-span-2" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://nettlive.cc/arsenal"
                title="Arsenal FC — Live stream (NettLive)"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-muted-foreground">
              <span>NettLive Arsenal stream — if the player doesn't load, open a mirror:</span>
              <div className="flex flex-wrap gap-2">
                <a className="rounded-md bg-secondary px-3 py-1 font-semibold text-secondary-foreground hover:bg-accent" href="https://nettlive.cc/arsenal" target="_blank" rel="noopener noreferrer">NettLive</a>
                <a className="rounded-md bg-secondary px-3 py-1 font-semibold text-secondary-foreground hover:bg-accent" href="https://sportsurge.net/soccer/" target="_blank" rel="noopener noreferrer">SportSurge</a>
                <a className="rounded-md bg-secondary px-3 py-1 font-semibold text-secondary-foreground hover:bg-accent" href="https://totalsportek.to/arsenal-live-stream" target="_blank" rel="noopener noreferrer">TotalSportek</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="standings" eyebrow="Table" title="Premier League Standings (Top 5)">
        <div className="overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
          <table className="w-full text-left">
            <thead className="bg-secondary text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Pos</th>
                <th className="px-6 py-3">Club</th>
                <th className="px-6 py-3 text-center">Played</th>
                <th className="px-6 py-3 text-center">GD</th>
                <th className="px-6 py-3 text-right">Points</th>
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
      </Section>

      <Section id="media" eyebrow="Watch" title="Media Hub & Highlights">
        <div className="grid gap-6 md:grid-cols-2">
          {media.map((m) => (
            <div key={m.title} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
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
      </Section>

      <Section id="schedule" eyebrow="Fixtures" title="Match Schedule & Results">
        <div className="overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Match</th>
                <th className="px-6 py-3">Competition</th>
                <th className="px-6 py-3 text-right">Status / Result</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s) => (
                <tr key={s.date} className="border-t border-border">
                  <td className="px-6 py-4 font-medium text-foreground">{s.date}</td>
                  <td className="px-6 py-4 text-foreground">{s.match}</td>
                  <td className="px-6 py-4 text-muted-foreground">{s.comp}</td>
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
      </Section>

      <Section id="squad" eyebrow="Players" title="First Team Squad Hub">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {squad.map((p) => (
            <div key={p.num} className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="relative bg-gradient-to-br from-primary to-[var(--navy)] p-6 text-primary-foreground">
                <span className="absolute right-4 top-3 text-4xl font-bold opacity-30">#{p.num}</span>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-xl font-bold backdrop-blur">{p.init}</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                <p className="text-sm font-medium text-primary">{p.role}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-center">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.s1[0]}</p>
                    <p className="text-xl font-bold text-foreground">{p.s1[1]}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.s2[0]}</p>
                    <p className="text-xl font-bold text-foreground">{p.s2[1]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="honours" eyebrow="Trophies" title="Club Honours">
        <div className="overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
          <table className="w-full text-left">
            <thead className="bg-secondary text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
      </Section>

      <footer className="bg-[var(--navy)] py-10 text-center text-sm text-primary-foreground/70">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-3 flex justify-center text-primary-foreground/90"><Cannon /></div>
          <p>© 2026 Arsenal Dashboard Fan Page. Built with premium structural optimization frameworks.</p>
          <p className="mt-2 text-primary-foreground/60">
            Crafted by <span className="font-bold text-[var(--gold)]">Luigi</span> — unofficial fan project, not affiliated with Arsenal FC or beIN Media Group.
          </p>
        </div>
      </footer>
    </main>
  );
}
