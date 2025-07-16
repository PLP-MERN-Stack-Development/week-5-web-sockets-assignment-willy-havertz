

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // Backend responds with { user, token }
      const { token, user } = res.data;
      login({ token, username: user.username });

      // Redirect to chat room
      navigate("/chat");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 mt-20 bg-[var(--surface)] rounded shadow"
    >
      <h1 className="text-2xl mb-4 text-center">Login</h1>

      <input
        type="text"
        className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring focus:ring-[var(--accent)]"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-[var(--accent)]"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full py-2 bg-[var(--accent)] text-white rounded font-semibold hover:opacity-90 transition"
      >
        Log In
      </button>

      <p className="mt-4 text-sm text-gray-400 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-[var(--accent)] hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
