"use client";

import { motion } from "framer-motion";
import Section from "./Section";

export default function Education() {
  return (
    <Section id="education" title="Education" subtitle="Where I studied">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-xl"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Minnesota State University, Mankato
            </h3>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--accent)" }}
            >
              B.S. Computer Information Technology (CIT)
            </p>
          </div>
          <span
            className="text-xs tracking-wide"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Graduated 12/2024
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {[
              "Minor in Technical Communication",
              "Certificate in Information Security",
            ].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-md text-xs"
                style={{
                  backgroundColor: "var(--accent-glow)",
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <div>
            <p
              className="text-xs uppercase tracking-wider mb-2 mt-4"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Relevant Coursework
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Data Science (LightGBM stock prediction), Network Infrastructure
              &amp; Cybersecurity (Cisco Packet Tracer, VLAN/HSRP configurations),
              Project Management, Technical Communication
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}