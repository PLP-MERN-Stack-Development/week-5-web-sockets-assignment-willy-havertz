export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((m, i) => (
        <div
          key={i}
          className={m.system ? "text-center italic text-gray-500" : ""}
        >
          {!m.system && <span className="font-semibold mr-2">{m.sender}:</span>}
          <span>{m.text}</span>
          {m.time && (
            <span className="ml-2 text-xs text-gray-400">{m.time}</span>
          )}
        </div>
      ))}
    </div>
  );
}
