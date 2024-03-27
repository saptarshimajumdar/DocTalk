import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Chat = ({ chat }) => {
  const [message, setMessage] = useState('');
  const [prevChat, setPrevChat] = useState([]);
  const messagesEndRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Fetch previous messages and initialize chat
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`http://localhost:3000/api/chat/${chat.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPrevChat(response.data.prevChats);

      if (response.data.prevChats.length === 0) {
        try {
          const initResponse = await axios.post(`http://localhost:3000/api/chat/firstchat/${chat.id}`, null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setPrevChat((prevChat) => [...prevChat, initResponse.data.message]);
        } catch (error) {
          console.error("Error initializing chat:", error);
        }
      }
    };
    fetchMessages();
  }, [chat]);

  // Scroll to bottom of chat window when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [prevChat]);

  // Send message
  const handleSendMessage = async () => {
    console.log('Sending message:', message);

    setPrevChat((prevChat) => [...prevChat, { role: 'user', content: message }]);

    const response = await axios.post(`http://localhost:3000/api/chat/${chat.id}`, { message }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setPrevChat((prevChat) => [...prevChat, response.data.message]);

    setMessage('');
  };

  return (
    <div className="w-1/2 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold p-4 border-b">{chat.name}</h2>
      </div>

      <div className="flex-grow py-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        {prevChat.map((msg, index) => (
          <div key={index} className={msg.role === 'user' ? 'bg-blue-100 p-2 text-right' : 'bg-slate-100 p-2 text-left'}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef}></div> {/* This div ensures scrolling to bottom */}
      </div>

      <div className="bottom-div flex items-center justify-between p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Message..."
          className="w-4/5 px-4 py-2 border rounded mr-2"
        />
        <button onClick={handleSendMessage} className="px-6 py-2 bg-blue-500 text-white rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
