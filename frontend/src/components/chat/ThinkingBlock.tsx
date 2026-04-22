"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ThinkingBlockProps {
  content: string;
  isStreaming?: boolean;
}

export default function ThinkingBlock({
  content,
  isStreaming = false,
}: ThinkingBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs tracking-wide uppercase transition-colors duration-200"
        style={{
          color: "var(--accent-dim)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block text-[10px]"
        >
          ▶
        </motion.span>
        <span>
          {isStreaming ? "Thinking…" : "View reasoning"}
        </span>
        {isStreaming && (
          <span className="inline-flex gap-[2px]">
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="mt-2 p-3 rounded-lg text-sm leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap"
              style={{
                backgroundColor: "var(--thinking-bg)",
                borderLeft: "2px solid var(--thinking-border)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
              }}
            >
              {content}
              {isStreaming && <span className="cursor-blink" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}