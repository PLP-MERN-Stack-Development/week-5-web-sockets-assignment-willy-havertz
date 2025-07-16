import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = []; // in-memory user store: { username, passwordHash }

export async function register(req, res) {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "Username taken" });
  }
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, hash });
  return res.status(201).json({ message: "Registered" });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.hash))) {
    return res.status(401).json({ error: "Invalid creds" });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  return res.json({ token, username });
}
