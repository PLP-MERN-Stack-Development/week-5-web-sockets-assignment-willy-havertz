export default function TypingIndicator({ typing }) {
  if (!typing?.isTyping) return null;
  return (
    <div className="p-2 text-sm italic text-gray-500">
      {typing.user} is typing…
    </div>
  );
}
