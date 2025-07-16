import jwt from "jsonwebtoken";

const online = new Map(); // socket.id -> username

export function socketHandler(socket, io) {
  // On auth, client emits "join" with token
  socket.on("join", ({ token }) => {
    try {
      const { username } = jwt.verify(token, process.env.JWT_SECRET);
      online.set(socket.id, username);
      io.emit("users", Array.from(new Set(online.values())));
      io.emit("notification", `${username} joined`);
    } catch {
      socket.emit("error", "Auth failed");
    }
  });

  socket.on("message", (msg) => {
    const sender = online.get(socket.id);
    io.emit("message", {
      sender,
      text: msg,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("typing", (isTyping) => {
    const user = online.get(socket.id);
    socket.broadcast.emit("typing", { user, isTyping });
  });

  socket.on("disconnect", () => {
    const user = online.get(socket.id);
    online.delete(socket.id);
    io.emit("users", Array.from(new Set(online.values())));
    io.emit("notification", `${user} left`);
  });
}
