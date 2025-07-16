import { useState } from "react";
import { socket } from "../socket/socket.js";

export default function ChatInput({ onLocalSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    // 1) Optimistically add the message locally
    onLocalSend({
      sender: "You",
      text,
      time: new Date().toLocaleTimeString(),
      system: false,
    });

    // 2) Emit to server
    socket.emit("message", text);

    // Clear input and stop typing indicator
    setText("");
    socket.emit("typing", false);
  };

  return (
    <div className="p-4 bg-[var(--surface)] flex">
      <input
        className="flex-1 p-2 border rounded"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          socket.emit("typing", e.target.value.length > 0);
        }}
        placeholder="Type a message…"
      />
      <button
        onClick={send}
        className="ml-2 px-4 bg-[var(--accent)] text-white rounded"
      >
        Send
      </button>
    </div>
  );
}
