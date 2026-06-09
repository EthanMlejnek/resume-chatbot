export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface SSECallbacks {
  onThinking: (text: string) => void;
  onText: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function streamChat(
  message: string,
  conversationHistory: ChatMessage[],
  callbacks: SSECallbacks
): Promise<void> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      conversation_history: conversationHistory,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    callbacks.onError(`Request failed: ${response.status} — ${errorText}`);
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    callbacks.onError("No response stream available.");
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  const processDataLine = (dataLine: string) => {
    try {
      const payload = JSON.parse(dataLine.slice(6)); // strip "data: "

      switch (payload.type) {
        case "thinking":
          callbacks.onThinking(payload.content);
          break;
        case "text":
          callbacks.onText(payload.content);
          break;
        case "done":
          callbacks.onDone();
          break;
        case "error":
          callbacks.onError(payload.content);
          break;
      }
    } catch {
      // Skip malformed JSON
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Append the new chunk to our line buffer
    buffer += decoder.decode(value, { stream: true });

    // Process complete lines only — never split on \n\n because JSON
    // payloads can contain \n\n inside string values (e.g. markdown),
    // which would corrupt the event boundary detection.
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? ""; // Last element may be an incomplete line

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        processDataLine(line);
      }
      // Ignore comment lines (":"), event type lines ("event: ..."), etc.
    }
  }

  // Process any remaining complete data line in the buffer
  if (buffer.startsWith("data: ")) {
    processDataLine(buffer);
  }
}