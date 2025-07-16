# 🔌 Socket.io Real‑Time Chat Application

A fully functional real‑time chat application built with Node.js, Express, Socket.io, React (Vite), and Tailwind CSS. Users can register/login, join a global chat room, see who’s online, send messages, see typing indicators, and receive join/leave notifications—all in an Instagram‑style dark mode UI.

---

## 🚀 Features

- **User Authentication** (JWT‑based)  
- **Global Chat Room** — everyone hears your messages  
- **Online Users List** — see who’s connected  
- **Typing Indicator** — “User is typing…” feedback  
- **Join/Leave Notifications** — system messages on connect/disconnect  
- **Optimistic UI** — your messages appear instantly  
- **Responsive Design** with dark mode styling (Tailwind CSS)  

---

## 🛠 Technology Stack

- **Backend:**  
  - Node.js & Express  
  - Socket.io for real‑time WebSocket communication  
  - bcryptjs for password hashing  
  - jsonwebtoken for JWT auth  

- **Frontend:**  
  - React (via Vite)  
  - Tailwind CSS for utility‑first styling & dark mode  
  - socket.io‑client for real‑time events  
  - axios for HTTP requests  
  - react-router for navigation  

---

## 📁 Folder Structure

socketio-chat/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInput.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── OnlineUsers.jsx
│   │   │   └── TypingIndicator.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── AuthProvider.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── ChatRoom.jsx
│   │   │   └── Login.jsx
│   │   ├── socket/
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
└── server/
    ├── controllers/
    │   └── auth.js
    ├── routes/
    │   └── auth.js
    ├── socket/
    │   └── index.js
    ├── server.js
    ├── .env
    └── package.json

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git https://github.com/PLP-MERN-Stack-Development/week-5-web-sockets-assignment-willy-havertz.git
cd socketio-chat
