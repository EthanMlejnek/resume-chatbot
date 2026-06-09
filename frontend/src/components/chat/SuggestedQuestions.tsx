"use client";

import { motion } from "framer-motion";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const QUESTIONS = [
  "What's Ethan's tech stack?",
  "Tell me about his work at CommScope",
  "What projects has he built?",
  "What's he looking for in his next role?",
];

export default function SuggestedQuestions({
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {QUESTIONS.map((q, i) => (
        <motion.button
          key={q}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
          onClick={() => onSelect(q)}
          disabled={disabled}
          className="px-4 py-2 rounded-full text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-body)",
          }}
          whileHover={
            disabled
              ? {}
              : {
                  backgroundColor: "var(--bg-surface-hover)",
                  borderColor: "var(--accent-dim)",
                  color: "var(--text-primary)",
                }
          }
          whileTap={disabled ? {} : { scale: 0.97 }}
        >
          {q}
        </motion.button>
      ))}
    </div>
  );
}