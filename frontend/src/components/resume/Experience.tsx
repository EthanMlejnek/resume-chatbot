"use client";

import { motion } from "framer-motion";
import Section from "./Section";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "CommScope",
    role: "Software Engineer I",
    period: "2024 — 2026",
    description:
      "Primary developer on a two-person team building ULIMS, an internal lab management web application serving the Shakopee, MN facility.",
    highlights: [
      "Built complex AG-Grid tables with custom cell renderers and drag-and-drop",
      "Designed a sensor monitoring dashboard with Apache ECharts and spec line overlays",
      "Created fiber optic data visualizations with dual Y-axes, optimized for large datasets",
      "Managed Azure DevOps CI/CD pipelines and IIS deployment",
    ],
    tech: ["Next.js", "React", "TypeScript", "ASP.NET Core", "C#", "MSSQL"],
  },
  {
    company: "DataAnnotation",
    role: "AI Data Trainer",
    period: "2023 — 2024",
    description:
      "Independent contractor evaluating and training AI model outputs for quality and accuracy.",
    highlights: [
      "Evaluated model responses across diverse domains",
      "Provided structured feedback to improve model performance",
    ],
    tech: ["AI/ML", "Data Evaluation"],
  },
];

export default function Experience() {
  return (
    <Section id="experience" title="Experience" subtitle="Where I've worked">
      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-[7px] top-3 bottom-3 w-px hidden md:block"
          style={{ backgroundColor: "var(--border)" }}
        />

        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative md:pl-10"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 hidden md:block"
                style={{
                  borderColor: "var(--accent)",
                  backgroundColor: "var(--bg-primary)",
                }}
              />

              <div
                className="p-6 rounded-xl transition-colors duration-300"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className="text-xs tracking-wide"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {exp.description}
                </p>

                <ul className="space-y-1.5 mb-4">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm flex items-start gap-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--accent-dim)" }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs"
                      style={{
                        backgroundColor: "var(--accent-glow)",
                        color: "var(--accent)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}