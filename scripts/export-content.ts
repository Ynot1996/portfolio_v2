// One-off: serialise the current hardcoded content to JSON for the CMS seed.
// Run from portfolio_v2:  npx tsx scripts/export-content.ts
import { writeFileSync } from "fs";
import { profile, projects, timeline, techGroups } from "../app/data";

const out = {
  profile,
  projects,
  timeline,
  techGroups: techGroups.map((g) => ({
    category: g.category,
    items: g.items.map((it) => ({
      name: it.name,
      color: it.color ?? null,
      // react-icons component → try to recover its export name
      iconName: (it.icon as unknown as { name?: string; displayName?: string } | undefined)
        ? ((it.icon as unknown as { displayName?: string; name?: string }).displayName ??
           (it.icon as unknown as { name?: string }).name ??
           null)
        : null,
    })),
  })),
};

const dest = process.argv[2] || "/tmp/portfolio-content.json";
writeFileSync(dest, JSON.stringify(out, null, 2));
console.log(`wrote ${dest}`);
console.log(
  "icon names sample:",
  out.techGroups[0].items.map((i) => `${i.name}=${i.iconName}`).join(", ")
);
