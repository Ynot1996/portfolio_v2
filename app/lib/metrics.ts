// Server-only: fetches live project reach metrics from the GitHub REST API.
//
// - Stars / forks come from the public repo endpoint (no auth needed).
// - 14-day traffic (views + unique visitors) comes from the traffic endpoints,
//   which require a token with push access to the repo. Set GITHUB_TOKEN
//   (a classic PAT with the `repo` scope) as an env var to enable them.
//
// Results are cached for an hour (ISR) so we never hammer the API or hit rate
// limits, and every call degrades gracefully: a missing token or a failed repo
// simply omits its traffic numbers rather than breaking the page.

import { projects } from "../data";

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600; // refresh at most once an hour
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

export interface RepoMetric {
  slug: string;
  title: string;
  owner: string;
  name: string;
  repoUrl: string;
  live?: string;
  stars: number;
  forks: number;
  /** 14-day totals from the traffic API; null when unavailable. */
  views: number | null;
  visitors: number | null;
}

export interface MetricsSummary {
  perProject: RepoMetric[];
  totals: {
    repos: number;
    stars: number;
    forks: number;
    views: number;
    visitors: number;
  };
  /** True when at least one repo returned traffic data (token present + access). */
  hasTraffic: boolean;
  tokenConfigured: boolean;
  generatedAt: string;
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

async function fetchRepoMetric(p: {
  slug: string;
  title: string;
  repo: string;
  live?: string;
}): Promise<RepoMetric | null> {
  const parsed = parseRepo(p.repo);
  if (!parsed) return null;
  const { owner, name } = parsed;

  const core = await ghJson<{ stargazers_count: number; forks_count: number }>(
    `/repos/${owner}/${name}`
  );

  // The traffic endpoint only resolves with a push-access token; skip otherwise.
  const views = TOKEN
    ? await ghJson<{ count: number; uniques: number }>(
        `/repos/${owner}/${name}/traffic/views`
      )
    : null;

  return {
    slug: p.slug,
    title: p.title,
    owner,
    name,
    repoUrl: `https://github.com/${owner}/${name}`,
    live: p.live,
    stars: core?.stargazers_count ?? 0,
    forks: core?.forks_count ?? 0,
    views: views ? views.count : null,
    visitors: views ? views.uniques : null,
  };
}

export async function getProjectMetrics(): Promise<MetricsSummary> {
  const tracked = projects.filter((p) => Boolean(p.repo));

  const results = await Promise.all(
    tracked.map((p) =>
      fetchRepoMetric({
        slug: p.slug,
        title: p.title,
        repo: p.repo as string,
        live: p.live,
      })
    )
  );

  const perProject = results.filter((r): r is RepoMetric => r !== null);

  const totals = perProject.reduce(
    (acc, r) => ({
      repos: acc.repos + 1,
      stars: acc.stars + r.stars,
      forks: acc.forks + r.forks,
      views: acc.views + (r.views ?? 0),
      visitors: acc.visitors + (r.visitors ?? 0),
    }),
    { repos: 0, stars: 0, forks: 0, views: 0, visitors: 0 }
  );

  const hasTraffic = perProject.some((r) => r.views !== null);

  // Sort the breakdown by reach: views first, then stars, then name.
  perProject.sort(
    (a, b) =>
      (b.views ?? 0) - (a.views ?? 0) ||
      b.stars - a.stars ||
      a.title.localeCompare(b.title)
  );

  return {
    perProject,
    totals,
    hasTraffic,
    tokenConfigured: Boolean(TOKEN),
    generatedAt: new Date().toISOString(),
  };
}
