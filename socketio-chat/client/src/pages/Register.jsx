import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      // on success, go to login
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 mt-20 bg-[var(--surface)] rounded"
    >
      <h1 className="text-2xl mb-4">Register</h1>

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

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <button
        type="submit"
        className="w-full py-2 bg-[var(--accent)] text-white rounded"
      >
        Sign Up
      </button>

      <p className="mt-4 text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-[var(--accent)] hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
