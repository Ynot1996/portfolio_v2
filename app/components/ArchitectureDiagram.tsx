"use client";

import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import type { Architecture } from "../data";

/**
 * Data-driven, theme-aware architecture diagram.
 * Renders layers top → bottom (e.g. Client → API → Services → Data) with
 * each layer's nodes side by side and connectors between layers. Fully
 * responsive — no fixed SVG canvas, so it reflows cleanly on mobile.
 */
export default function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { summary, layers } = architecture;

  return (
    <div className="rounded-3xl border border-line bg-panel2/40 p-5 sm:p-8">
      {summary && (
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
          {summary}
        </p>
      )}

      <div className="flex flex-col items-stretch gap-2">
        {layers.map((layer, li) => (
          <div key={layer.title}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: li * 0.06 }}
            >
              {/* layer label */}
              <div className="mb-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {layer.title}
              </div>

              {/* nodes */}
              <div className="flex flex-wrap items-stretch justify-center gap-3">
                {layer.nodes.map((node) => (
                  <div
                    key={node.label}
                    className="flex min-w-[8.5rem] max-w-[14rem] flex-1 flex-col rounded-2xl border border-line bg-panel px-4 py-3 text-center shadow-soft"
                  >
                    <span className="text-sm font-semibold text-ink">{node.label}</span>
                    {node.sub && (
                      <span className="mt-0.5 font-mono text-[11px] text-muted">{node.sub}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* connector to next layer */}
            {li < layers.length - 1 && (
              <div className="flex justify-center py-1.5" aria-hidden>
                <FiChevronDown className="h-5 w-5 text-accent/50" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
