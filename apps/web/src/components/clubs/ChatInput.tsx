import React from "react";
const ChatInput = ({
  message,
  setMessage,
  handleSubmit,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent) => void;
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 mt-2 flex items-center bg-white p-2"
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Type a message"
      />
      <button
        type="submit"
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        aria-label="Send message"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
