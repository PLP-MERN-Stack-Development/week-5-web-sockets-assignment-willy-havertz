import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ChatRoom from "./pages/ChatRoom.jsx";
import useAuth from "./hooks/useAuth.js";

export default function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={token ? <ChatRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/chat" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
