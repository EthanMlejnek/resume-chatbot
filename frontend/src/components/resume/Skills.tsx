"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";

interface Skill {
  name: string;
  category: string;
}

const SKILLS: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "HTML / CSS", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "AG-Grid", category: "Frontend" },
  { name: "Apache ECharts", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },

  // Backend
  { name: "ASP.NET Core", category: "Backend" },
  { name: "C#", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },

  // Data
  { name: "MSSQL", category: "Data" },
  { name: "MySQL", category: "Data" },
  { name: "SQL", category: "Data" },

  // DevOps & Tools
  { name: "Git", category: "DevOps" },
  { name: "Azure DevOps", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "IIS", category: "DevOps" },

  // Other
  { name: "Agile", category: "Other" },
  { name: "LLM Integration", category: "Other" },
  { name: "Data Visualization", category: "Other" },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Data", "DevOps", "Other"];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <Section id="skills" title="Skills" subtitle="What I work with">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all duration-200"
            style={{
              backgroundColor:
                activeCategory === cat
                  ? "var(--accent-glow-strong)"
                  : "var(--bg-surface)",
              border: `1px solid ${activeCategory === cat ? "var(--accent-dim)" : "var(--border-subtle)"}`,
              color:
                activeCategory === cat
                  ? "var(--accent)"
                  : "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <motion.div layout className="flex flex-wrap gap-3">
        {filtered.map((skill) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{
              scale: 1.05,
              borderColor: "var(--accent-dim)",
            }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2.5 rounded-lg cursor-default"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
            }}
          >
            <span>{skill.name}</span>
            <span
              className="ml-2 text-[10px] tracking-wider uppercase"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {skill.category}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}