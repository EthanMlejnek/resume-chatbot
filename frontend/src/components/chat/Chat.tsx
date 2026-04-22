"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { streamChat, type ChatMessage } from "@/lib/api";
import ThinkingBlock from "./ThinkingBlock";
import SuggestedQuestions from "./SuggestedQuestions";

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  thinking: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setInput("");

    const userMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
      thinking: "",
    };

    const assistantMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      thinking: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);
    setIsThinking(true);

    // Build conversation history for the API (exclude current exchange)
    const history: ChatMessage[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      await streamChat(messageText, history, {
        onThinking: (chunk) => {
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last.role === "assistant") {
              last.thinking += chunk;
            }
            return updated;
          });
        },
        onText: (chunk) => {
          setIsThinking(false);
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last.role === "assistant") {
              last.content += chunk;
            }
            return updated;
          });
        },
        onDone: () => {
          setIsLoading(false);
          setIsThinking(false);
        },
        onError: (error) => {
          setIsLoading(false);
          setIsThinking(false);
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last.role === "assistant") {
              last.content = `Something went wrong: ${error}`;
            }
            return updated;
          });
        },
      });
    } catch {
      setIsLoading(false);
      setIsThinking(false);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          last.content =
            "Unable to connect to the server. Please try again later.";
        }
        return updated;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length === 0 && !isLoading;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col">
      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
        style={{ minHeight: "320px", maxHeight: "520px" }}
      >
        {/* Empty state */}
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Ask me anything about Ethan&apos;s background.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                powered by AI · responses may vary
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message list */}
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "user" ? (
              <div
                className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-md text-sm leading-relaxed"
                style={{
                  backgroundColor: "var(--chat-user-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                {msg.content}
              </div>
            ) : (
              <div className="max-w-[90%]">
                {/* Thinking block */}
                <ThinkingBlock
                  content={msg.thinking}
                  isStreaming={isThinking && msg.id === messages[messages.length - 1]?.id}
                />

                {/* Response text */}
                {msg.content ? (
                  <div
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {msg.content}
                    {isLoading &&
                      !isThinking &&
                      msg.id === messages[messages.length - 1]?.id && (
                        <span className="cursor-blink" />
                      )}
                  </div>
                ) : (
                  isThinking &&
                  msg.id === messages[messages.length - 1]?.id && (
                    <div
                      className="text-sm"
                      style={{
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Thinking…
                    </div>
                  )
                )}
              </div>
            )}
          </motion.div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4"
          >
            <SuggestedQuestions onSelect={handleSend} disabled={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <div className="px-4 pb-4 pt-2">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border)",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Ethan's experience…"
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-sm placeholder-opacity-50 disabled:opacity-50"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: input.trim() && !isLoading ? "var(--accent)" : "transparent",
              color: input.trim() && !isLoading ? "var(--bg-primary)" : "var(--text-muted)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}