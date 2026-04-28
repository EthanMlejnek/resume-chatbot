"use client";

import { motion } from "framer-motion";
import Section from "./Section";

interface Project {
  title: string;
  description: string;
  tech: string[];
  type: string;
  // Add optional screenshot path here later:
  // screenshot?: string;
}

const PROJECTS: Project[] = [
  {
    title: "ULIMS",
    description:
      "Internal lab management application at CommScope. Built complex data grids, sensor dashboards, and fiber optic data visualizations as the primary frontend developer.",
    tech: ["Next.js", "React", "TypeScript", "AG-Grid", "ECharts", "ASP.NET Core"],
    type: "Professional",
  },
  {
    title: "Resume AI Chatbot",
    description:
      "This website — an AI-powered interactive resume where recruiters can ask questions about my background through a conversational interface with visible model reasoning.",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "Anthropic API"],
    type: "Personal",
  },
  {
    title: "Database Q&A Chatbot",
    description:
      "Natural language interface for querying databases. Users enter prompts and the system generates SQL queries, displaying the model's thought process alongside results.",
    tech: ["React", "Ollama", "SQL", "Python"],
    type: "Personal",
  },
  {
    title: "LightGBM Stock Predictor",
    description:
      "Machine learning model for stock price prediction built as an academic data science project, using gradient boosting for time-series financial data.",
    tech: ["Python", "LightGBM", "Pandas", "Scikit-learn"],
    type: "Academic",
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects" subtitle="What I've built">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group p-6 rounded-xl transition-all duration-300 cursor-default"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {project.title}
              </h3>
              <span
                className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded"
                style={{
                  color: "var(--accent-dim)",
                  backgroundColor: "var(--accent-glow)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {project.type}
              </span>
            </div>

            {/* Screenshot placeholder — uncomment and add images later */}
            {/* {project.screenshot && (
              <div className="mb-4 rounded-lg overflow-hidden border"
                style={{ borderColor: "var(--border)" }}>
                <Image src={project.screenshot} alt={project.title}
                  width={600} height={340} className="w-full" />
              </div>
            )} */}

            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}