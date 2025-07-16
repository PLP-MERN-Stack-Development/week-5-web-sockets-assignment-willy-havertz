export default function OnlineUsers({ users }) {
  return (
    <>
      <h2 className="font-semibold mb-2">Online</h2>
      <ul className="space-y-1">
        {users.map((u, i) => (
          <li key={i} className="text-sm">
            {u}
          </li>
        ))}
      </ul>
    </>
  );
}
