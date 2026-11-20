// Server-only: fetches live project metrics from the GitHub REST API.
//
// Two audiences, one source:
//   • Public  — getPublicMetrics()  → only PUBLIC repos, safe reach numbers.
//                 Used by the homepage "Project reach" section.
//   • Owner   — getOwnerMetrics()   → every tracked repo incl. PRIVATE ones,
//                 with the full metric set + referrers. Used by /dashboard
//                 (password-gated). Private repos are never returned publicly.
//
// - Stars / forks / watchers / issues come from the public repo endpoint.
// - 14-day traffic (views, visitors, clones) and referrers need a token with
//   push access — set GITHUB_TOKEN (classic PAT, `repo` scope).
//
// Cached for an hour (ISR). Every call degrades gracefully: a missing token or
// a failed repo simply omits those numbers rather than breaking the page.

import { projects } from "../data";

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

export interface Referrer {
  referrer: string;
  count: number;
  uniques: number;
}

export interface RepoMetric {
  slug: string;
  title: string;
  owner: string;
  name: string;
  repoUrl: string;
  live?: string;
  isPrivate: boolean;
  // engagement
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  // 14-day traffic (null when unavailable)
  views: number | null;
  visitors: number | null;
  clones: number | null;
  cloneVisitors: number | null;
  // activity / meta
  language: string | null;
  pushedAt: string | null;
  sizeKb: number;
  // owner-only
  topReferrers: Referrer[];
}

export interface MetricsSummary {
  perProject: RepoMetric[];
  totals: {
    repos: number;
    stars: number;
    forks: number;
    watchers: number;
    views: number;
    visitors: number;
    clones: number;
  };
  hasTraffic: boolean;
  tokenConfigured: boolean;
  includesPrivate: boolean;
  generatedAt: string;
}

interface CoreRepo {
  private: boolean;
  stargazers_count: number;
  forks_count: number;
  subscribers_count: number;
  open_issues_count: number;
  language: string | null;
  pushed_at: string | null;
  size: number;
}

function parseRepo(url: string): { owner: string; name: string } | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!m) return null;
  return { owner: m[1], name: m[2].replace(/\.git$/, "") };
}

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

async function ghJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fetchRepoMetric(
  p: { slug: string; title: string; repo: string; live?: string },
  withReferrers: boolean
): Promise<RepoMetric | null> {
  const parsed = parseRepo(p.repo);
  if (!parsed) return null;
  const { owner, name } = parsed;

  const core = await ghJson<CoreRepo>(`/repos/${owner}/${name}`);

  // Traffic + referrers only resolve with a push-access token.
  const [views, clones, referrers] = TOKEN
    ? await Promise.all([
        ghJson<{ count: number; uniques: number }>(`/repos/${owner}/${name}/traffic/views`),
        ghJson<{ count: number; uniques: number }>(`/repos/${owner}/${name}/traffic/clones`),
        withReferrers
          ? ghJson<Referrer[]>(`/repos/${owner}/${name}/traffic/popular/referrers`)
          : Promise.resolve(null),
      ])
    : [null, null, null];

  return {
    slug: p.slug,
    title: p.title,
    owner,
    name,
    repoUrl: `https://github.com/${owner}/${name}`,
    live: p.live,
    isPrivate: core?.private ?? false,
    stars: core?.stargazers_count ?? 0,
    forks: core?.forks_count ?? 0,
    watchers: core?.subscribers_count ?? 0,
    openIssues: core?.open_issues_count ?? 0,
    views: views ? views.count : null,
    visitors: views ? views.uniques : null,
    clones: clones ? clones.count : null,
    cloneVisitors: clones ? clones.uniques : null,
    language: core?.language ?? null,
    pushedAt: core?.pushed_at ?? null,
    sizeKb: core?.size ?? 0,
    topReferrers: (referrers ?? []).slice(0, 4),
  };
}

async function build(
  tracked: { slug: string; title: string; repo: string; live?: string }[],
  { includePrivate, withReferrers }: { includePrivate: boolean; withReferrers: boolean }
): Promise<MetricsSummary> {
  const results = await Promise.all(tracked.map((p) => fetchRepoMetric(p, withReferrers)));

  let perProject = results.filter((r): r is RepoMetric => r !== null);
  // Safety net: never surface a private repo in the public view, even if the
  // caller's tracked list somehow included one.
  if (!includePrivate) perProject = perProject.filter((r) => !r.isPrivate);

  const totals = perProject.reduce(
    (acc, r) => ({
      repos: acc.repos + 1,
      stars: acc.stars + r.stars,
      forks: acc.forks + r.forks,
      watchers: acc.watchers + r.watchers,
      views: acc.views + (r.views ?? 0),
      visitors: acc.visitors + (r.visitors ?? 0),
      clones: acc.clones + (r.clones ?? 0),
    }),
    { repos: 0, stars: 0, forks: 0, watchers: 0, views: 0, visitors: 0, clones: 0 }
  );

  perProject.sort(
    (a, b) =>
      (b.views ?? 0) - (a.views ?? 0) ||
      b.stars - a.stars ||
      a.title.localeCompare(b.title)
  );

  return {
    perProject,
    totals,
    hasTraffic: perProject.some((r) => r.views !== null),
    tokenConfigured: Boolean(TOKEN),
    includesPrivate: includePrivate,
    generatedAt: new Date().toISOString(),
  };
}

/** Public reach — only public repos. Safe to render to anyone. */
export function getPublicMetrics(): Promise<MetricsSummary> {
  const tracked = projects
    .filter((p) => Boolean(p.repo))
    .map((p) => ({ slug: p.slug, title: p.title, repo: p.repo as string, live: p.live }));
  return build(tracked, { includePrivate: false, withReferrers: false });
}

/** Owner view — every tracked repo incl. private (via `metricsRepo`), full set. */
export function getOwnerMetrics(): Promise<MetricsSummary> {
  const tracked = projects
    .filter((p) => Boolean(p.repo || p.metricsRepo))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      repo: (p.repo || p.metricsRepo) as string,
      live: p.live,
    }));
  return build(tracked, { includePrivate: true, withReferrers: true });
}
