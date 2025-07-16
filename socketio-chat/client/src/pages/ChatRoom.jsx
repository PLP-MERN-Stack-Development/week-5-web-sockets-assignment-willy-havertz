import { useEffect, useState } from "react";
import { socket } from "../socket/socket.js";
import useAuth from "../hooks/useAuth.js";
import MessageList from "../components/MessageList.jsx";
import ChatInput from "../components/ChatInput.jsx";
import OnlineUsers from "../components/OnlineUsers.jsx";
import TypingIndicator from "../components/TypingIndicator.jsx";

export default function ChatRoom() {
  const { token, username, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    socket.emit("join", { token });

    socket.on("users", setUsers);
    socket.on("notification", (note) =>
      setMessages((m) => [...m, { system: true, text: note }])
    );
    socket.on("message", (msg) => setMessages((m) => [...m, msg]));
    socket.on("typing", (data) => setTyping(data));

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-[var(--surface)] flex justify-between">
        <span>Hello, {username}</span>
        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-48 bg-[var(--surface)] p-4 border-r">
          <OnlineUsers users={users} />
        </aside>
        <main className="flex flex-col flex-1">
          <MessageList messages={messages} />
          <TypingIndicator typing={typing} />
          <ChatInput />
        </main>
      </div>
    </div>
  );
}
