// src/Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log('Message received: ', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message: ', message);
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        <div className="h-64 overflow-y-scroll mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="text-sm text-gray-800">{msg}</span>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow px-3 py-2 mr-2 border rounded"
            placeholder="Type a message..."
          />
          <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
