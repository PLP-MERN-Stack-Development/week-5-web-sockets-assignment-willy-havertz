import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      login(res.data);
      navigate("/chat");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 mt-20 bg-[var(--surface)] rounded"
    >
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-[var(--accent)] text-white rounded"
      >
        Log In
      </button>
      <p className="mt-4 text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-[var(--accent)] hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
