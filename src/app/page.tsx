'use client'

import { invokeModel } from "@/services/sendMessage";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    // Here you can send `input` to your backend (API) and get the bot's response
    // Simulating a bot response:
    const responseModel = await invokeModel(input)
    console.log("Respuesta del modelo", responseModel)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: responseModel },
      ]);

    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10 px-4 lg:px-20">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          Prompt Pilot
        </h1>
        <h3 className="font-bold text-black text-center mb-2">
          Your GenAI Assistant
        </h3>
        <div className="mb-4 w-full overflow-y-auto border border-gray-300 rounded-md p-3 h-[600px]">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white rounded-l-lg rounded-t-lg"
                      : "bg-gray-200 text-black rounded-r-lg rounded-t-lg"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
  
}
