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
    // Join the chat with your JWT for authentication
    socket.emit("join", { token });

    // Update the online users list
    socket.on("users", (list) => setUsers(list));

    // System notifications (user join/leave)
    socket.on("notification", (note) => {
      setMessages((prev) => [...prev, { system: true, text: note }]);
    });

    // Incoming chat messages
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Typing indicator events
    socket.on("typing", (data) => {
      setTyping(data);
    });

    // Clean up on unmount
    return () => {
      socket.off("users");
      socket.off("notification");
      socket.off("message");
      socket.off("typing");
      socket.disconnect();
    };
  }, [token]);

  // Local echo: immediately append your own message
  const handleLocalSend = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

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
          <ChatInput onLocalSend={handleLocalSend} />
        </main>
      </div>
    </div>
  );
}
