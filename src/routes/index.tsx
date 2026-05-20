import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LiveTranslate } from "@/components/LiveTranslate";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ────────── TheSportsDB live data (free key = "3") ────────── */
const TSDB = "https://www.thesportsdb.com/api/v1/json/3";
const ARSENAL_ID = "133604";
const EPL_ID = "4328";
const SEASON = "2025-2026";

type TSDBEvent = {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strLeague: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  intRound?: string;
};
type TSDBStanding = {
  intRank: string;
  idTeam: string;
  strTeam: string;
  strBadge?: string;
  intPlayed: string;
  intWin: string;
  intDraw: string;
  intLoss: string;
  intGoalDifference: string;
  intPoints: string;
  strForm?: string;
};
type TSDBPlayer = {
  idPlayer: string;
  strPlayer: string;
  strPosition: string | null;
  strNumber: string | null;
  strNationality: string | null;
  strThumb: string | null;
  strCutout: string | null;
  strStatus: string | null;
};

async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Network ${r.status}`);
  return (await r.json()) as T;
}

function useStandings() {
  return useQuery({
    queryKey: ["standings", EPL_ID, SEASON],
    queryFn: () => fetchJson<{ table: TSDBStanding[] }>(`${TSDB}/lookuptable.php?l=${EPL_ID}&s=${SEASON}`),
    staleTime: 5 * 60_000,
  });
}
function useNext() {
  return useQuery({
    queryKey: ["next", ARSENAL_ID],
    queryFn: () => fetchJson<{ events: TSDBEvent[] | null }>(`${TSDB}/eventsnext.php?id=${ARSENAL_ID}`),
    staleTime: 5 * 60_000,
  });
}
function useLast() {
  return useQuery({
    queryKey: ["last", ARSENAL_ID],
    queryFn: () => fetchJson<{ results: TSDBEvent[] | null }>(`${TSDB}/eventslast.php?id=${ARSENAL_ID}`),
    staleTime: 5 * 60_000,
  });
}
function useSquad() {
  return useQuery({
    queryKey: ["squad", ARSENAL_ID],
    queryFn: () => fetchJson<{ player: TSDBPlayer[] | null }>(`${TSDB}/lookup_all_players.php?id=${ARSENAL_ID}`),
    staleTime: 30 * 60_000,
  });
}

/* ────────── Static heritage data (not "live", but real & verified) ────────── */
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

type SectionKey = "overview" | "live" | "broadcast" | "standings" | "schedule" | "squad" | "media" | "honours";
const tabs: { key: SectionKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "live", label: "Live" },
  { key: "broadcast", label: "Broadcast" },
  { key: "standings", label: "Standings" },
  { key: "schedule", label: "Schedule" },
  { key: "squad", label: "Squad" },
  { key: "media", label: "Media" },
  { key: "honours", label: "Honours" },
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

function Skeleton({ h = "h-24" }: { h?: string }) {
  return <div className={`w-full ${h} animate-pulse rounded-2xl bg-secondary/60`} />;
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
      Couldn't load live data: {msg}
    </div>
  );
}

function FormDots({ form }: { form?: string }) {
  if (!form) return null;
  return (
    <span className="inline-flex gap-1">
      {form.split("").slice(-5).map((c, i) => (
        <span
          key={i}
          title={c}
          className={`inline-block h-2 w-2 rounded-full ${
            c === "W" ? "bg-[var(--success)]" : c === "D" ? "bg-[var(--gold)]" : "bg-destructive"
          }`}
        />
      ))}
    </span>
  );
}

function MatchCard({ ev, finished }: { ev: TSDBEvent; finished: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-elegant)" }}>
      <div className="flex items-center justify-between bg-primary px-6 py-3 text-primary-foreground">
        <span className="text-xs font-semibold uppercase tracking-widest">
          {ev.strLeague}{ev.intRound ? ` • MD ${ev.intRound}` : ""}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">
          {ev.dateEvent} • {ev.strTime?.slice(0, 5)}
        </span>
      </div>
      <div className="grid grid-cols-3 items-center gap-4 p-8">
        <div className="flex flex-col items-center text-center">
          {ev.strHomeTeamBadge && <img src={ev.strHomeTeamBadge} alt="" loading="lazy" className="h-14 w-14 object-contain" />}
          <p className="mt-2 text-sm font-semibold text-foreground">{ev.strHomeTeam}</p>
        </div>
        <div className="text-center">
          {finished ? (
            <p className="font-display text-5xl font-bold text-foreground">
              {ev.intHomeScore} <span className="text-muted-foreground">—</span> {ev.intAwayScore}
            </p>
          ) : (
            <p className="font-display text-2xl font-bold text-muted-foreground">vs</p>
          )}
        </div>
        <div className="flex flex-col items-center text-center">
          {ev.strAwayTeamBadge && <img src={ev.strAwayTeamBadge} alt="" loading="lazy" className="h-14 w-14 object-contain" />}
          <p className="mt-2 text-sm font-semibold text-foreground">{ev.strAwayTeam}</p>
        </div>
      </div>
      <div className="border-t border-border bg-secondary/40 px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {finished ? "Full-Time" : "Upcoming Fixture"}
      </div>
    </div>
  );
}

function Index() {
  const [active, setActive] = useState<SectionKey>("overview");
  const standings = useStandings();
  const next = useNext();
  const last = useLast();
  const squad = useSquad();

  const nextEvent = next.data?.events?.[0];
  const lastEvent = last.data?.results?.[0];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3 text-primary">
            <Cannon className="h-6 w-12" />
            <div className="leading-tight">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground">Arsenal FC</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Est. 1886</p>
            </div>
          </div>
          <LiveTranslate />
        </div>
        {/* Horizontal tab nav */}
        <nav className="border-t border-border">
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`relative shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wide transition ${
                  active === t.key
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {active === "overview" && (
          <div>
            <div className="relative mb-10 overflow-hidden rounded-3xl text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)" }} />
              <div className="relative px-8 py-14 md:px-14 md:py-20">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">The Gunners</p>
                <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight md:text-6xl">Arsenal Football Club</h1>
                <p className="mt-4 text-base text-primary-foreground/80 md:text-lg">Victoria Concordia Crescit — Victory Through Harmony.</p>
              </div>
            </div>
            <PanelHeader eyebrow="Heritage" title="Club History" />
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Founded in 1886 by workers in Woolwich, Arsenal has grown into one of the most successful clubs in English football. Originally named Dial Square, the club moved north to Highbury and shortened its name to Arsenal FC.
              </p>
              <p>
                Famous for its rich traditions, including the legendary{" "}
                <span className="font-semibold text-foreground">"Invincibles"</span> 2003–2004 season — an entire Premier League campaign unbeaten under Arsène Wenger.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[{ l: "Founded", v: "1886" }, { l: "Home", v: "Emirates Stadium" }, { l: "Capacity", v: "60,704" }].map((s) => (
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
            <PanelHeader eyebrow="Match Centre" title="Latest & Next" sub="Live fixture data from TheSportsDB." />
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Most recent result</p>
                {last.isLoading && <Skeleton h="h-56" />}
                {last.error && <ErrorBox msg={(last.error as Error).message} />}
                {lastEvent && <MatchCard ev={lastEvent} finished />}
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Next fixture</p>
                {next.isLoading && <Skeleton h="h-56" />}
                {next.error && <ErrorBox msg={(next.error as Error).message} />}
                {nextEvent && <MatchCard ev={nextEvent} finished={false} />}
                {!next.isLoading && !nextEvent && (
                  <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
                    No upcoming fixture scheduled.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {active === "broadcast" && (
          <div>
            <PanelHeader
              eyebrow="Watch Live"
              title="Broadcast"
              sub="Live stream embedded from SportSurge (unofficial mirror). Official rights belong to Sky Sports, TNT Sports, NBC and beIN depending on your region."
            />
            <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src="https://sportsurge.club/arsenal-fc-live-stream/"
                  title="Arsenal FC — Live stream"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="border-t border-border p-4 text-sm text-muted-foreground">
                If the embedded player is blocked by your network, open the live stream on{" "}
                <a className="font-semibold text-primary hover:underline" href="https://sportsurge.club/" target="_blank" rel="noopener noreferrer">SportSurge</a>,{" "}
                <a className="font-semibold text-primary hover:underline" href="https://www.skysports.com/watch/football" target="_blank" rel="noopener noreferrer">Sky Sports</a>, or{" "}
                <a className="font-semibold text-primary hover:underline" href="https://www.bein.com/en/" target="_blank" rel="noopener noreferrer">beIN Sports</a>.
              </div>
            </div>
          </div>
        )}

        {active === "standings" && (
          <div>
            <PanelHeader eyebrow="Table" title={`Premier League ${SEASON}`} sub="Live standings from TheSportsDB." />
            {standings.isLoading && <Skeleton h="h-96" />}
            {standings.error && <ErrorBox msg={(standings.error as Error).message} />}
            {standings.data && (
              <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Club</th>
                      <th className="px-3 py-3 text-center">P</th>
                      <th className="px-3 py-3 text-center">W</th>
                      <th className="px-3 py-3 text-center">D</th>
                      <th className="px-3 py-3 text-center">L</th>
                      <th className="px-3 py-3 text-center">GD</th>
                      <th className="px-3 py-3 text-center hidden md:table-cell">Form</th>
                      <th className="px-4 py-3 text-right">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.data.table.map((r) => {
                      const isArs = r.idTeam === ARSENAL_ID;
                      return (
                        <tr key={r.idTeam} className={`border-t border-border ${isArs ? "bg-primary/5" : ""}`}>
                          <td className="px-4 py-3 font-bold">{r.intRank}</td>
                          <td className={`px-4 py-3 font-semibold ${isArs ? "text-primary" : "text-foreground"}`}>
                            <span className="inline-flex items-center gap-2">
                              {r.strBadge && <img src={r.strBadge} alt="" loading="lazy" className="h-5 w-5 object-contain" />}
                              {r.strTeam}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-center text-muted-foreground">{r.intPlayed}</td>
                          <td className="px-3 py-3 text-center text-muted-foreground">{r.intWin}</td>
                          <td className="px-3 py-3 text-center text-muted-foreground">{r.intDraw}</td>
                          <td className="px-3 py-3 text-center text-muted-foreground">{r.intLoss}</td>
                          <td className="px-3 py-3 text-center text-muted-foreground">{r.intGoalDifference}</td>
                          <td className="px-3 py-3 text-center hidden md:table-cell"><FormDots form={r.strForm} /></td>
                          <td className="px-4 py-3 text-right font-bold">{r.intPoints}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {active === "schedule" && (
          <div>
            <PanelHeader eyebrow="Fixtures" title="Recent & Upcoming" sub="Real fixtures from TheSportsDB." />
            {(last.isLoading || next.isLoading) && <Skeleton h="h-80" />}
            {(last.error || next.error) && <ErrorBox msg={((last.error || next.error) as Error).message} />}
            {(last.data || next.data) && (
              <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Match</th>
                      <th className="px-6 py-3 hidden md:table-cell">Competition</th>
                      <th className="px-6 py-3 text-right">Result / Kick-off</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...(last.data?.results ?? []), ...(next.data?.events ?? [])].map((ev) => {
                      const finished = ev.intHomeScore !== null && ev.intAwayScore !== null;
                      const arsHome = ev.strHomeTeam === "Arsenal";
                      const arsScore = Number(arsHome ? ev.intHomeScore : ev.intAwayScore);
                      const oppScore = Number(arsHome ? ev.intAwayScore : ev.intHomeScore);
                      const tone = finished ? (arsScore > oppScore ? "win" : arsScore === oppScore ? "draw" : "loss") : "up";
                      return (
                        <tr key={ev.idEvent} className="border-t border-border">
                          <td className="px-6 py-4 font-medium text-foreground">{ev.dateEvent}</td>
                          <td className="px-6 py-4 text-foreground">{ev.strEvent}</td>
                          <td className="px-6 py-4 hidden text-muted-foreground md:table-cell">{ev.strLeague}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                              tone === "win" ? "bg-[var(--success)]/15 text-[var(--success)]" :
                              tone === "loss" ? "bg-destructive/15 text-destructive" :
                              tone === "draw" ? "bg-[var(--gold)]/20 text-foreground" :
                              "bg-accent text-accent-foreground"
                            }`}>
                              {finished ? `${ev.intHomeScore} — ${ev.intAwayScore}` : ev.strTime?.slice(0, 5)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {active === "squad" && (
          <div>
            <PanelHeader eyebrow="Players" title="First Team Squad" sub="Live roster from TheSportsDB." />
            {squad.isLoading && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} h="h-52" />)}
              </div>
            )}
            {squad.error && <ErrorBox msg={(squad.error as Error).message} />}
            {squad.data?.player && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {squad.data.player
                  .filter((p) => p.strStatus !== "Retired" && p.strPosition && p.strPosition !== "Manager")
                  .slice(0, 18)
                  .map((p) => (
                    <div key={p.idPlayer} className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-card)" }}>
                      <div className="relative h-32 bg-gradient-to-br from-primary to-[var(--navy)] text-primary-foreground">
                        {p.strNumber && <span className="absolute right-4 top-3 font-display text-4xl font-bold opacity-30">#{p.strNumber}</span>}
                        {(p.strCutout || p.strThumb) && (
                          <img
                            src={p.strCutout || p.strThumb!}
                            alt={p.strPlayer}
                            loading="lazy"
                            className="absolute bottom-0 right-2 h-32 w-24 object-contain object-bottom"
                          />
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-bold text-foreground">{p.strPlayer}</h3>
                        <p className="text-sm font-medium text-primary">{p.strPosition}</p>
                        {p.strNationality && <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{p.strNationality}</p>}
                      </div>
                    </div>
                  ))}
              </div>
            )}
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
      </div>

      <footer className="border-t border-border bg-[var(--navy)] py-10 text-center text-sm text-primary-foreground/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-3 flex justify-center text-primary-foreground/90"><Cannon /></div>
          <p>© 2026 Arsenal Dashboard — unofficial fan project, not affiliated with Arsenal FC or beIN Media Group.</p>
          <p className="mt-2 text-primary-foreground/60">
            Crafted by <span className="font-bold text-[var(--gold)]">Luigi</span> • Live data from TheSportsDB.
          </p>
        </div>
      </footer>
    </main>
  );
}