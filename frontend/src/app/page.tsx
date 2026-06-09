"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Chat from "@/components/chat/Chat";
import Experience from "@/components/resume/Experience";
import Projects from "@/components/resume/Projects";
import Skills from "@/components/resume/Skills";
import Education from "@/components/resume/Education";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero / Chat Section ── */}
        <section
          id="chat"
          className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212, 168, 67, 0.06) 0%, transparent 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 relative z-10"
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Hi, I&apos;m{" "}
              <span style={{ color: "var(--accent)" }}>Ethan</span>
            </h1>
            <p
              className="text-base md:text-lg max-w-lg mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Software engineer with a focus on modern web development.
              <br />
              Ask my AI anything about my background.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-3xl relative z-10 rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <Chat />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span
                className="text-[10px] tracking-widest uppercase"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Scroll to explore
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ color: "var(--text-muted)" }}
              >
                <path
                  d="M8 3v10m0 0l-4-4m4 4l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Divider ── */}
        <div className="accent-line mx-auto max-w-md" />

        {/* ── Resume Sections ── */}
        <Experience />
        <Projects />
        <Skills />
        <Education />

        {/* ── Footer ── */}
        <footer className="py-16 px-6 text-center">
          <div className="accent-line mx-auto max-w-md mb-5" />
          <p
            className="text-xs tracking-wide"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Built with Next.js, FastAPI&nbsp;&nbsp;·&nbsp;&nbsp;
            <a
              href="https://github.com/EthanMlejnek/resume-chatbot"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "var(--accent-dim)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--accent-dim)")
              }
            >
              Source
            </a>
          </p>
          <p
           className="text-xs tracking-wide mt-2"
           style={{
             color: "var(--text-muted)",
             fontFamily: "var(--font-mono)",
            }} 
          >
            Disclaimer: Developed with the assistance of AI, but not wholly AI-generated.
          </p>
          <p
            className="text-xs tracking-wide mt-1"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            All content and design decisions were made by me, Ethan Mlejnek.
          </p>
        </footer>
      </main>
    </>
  );
}