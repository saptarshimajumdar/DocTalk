import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsed, setCollapsed] = useState(false); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-300 shadow-lg transform transition-transform ${collapsed ? '-translate-x-52' : 'translate-x-0'}`}>
      {!collapsed && (
        <div> 
          <h2 className="cursor-pointer bg-slate-300 p-4 font-bold" onClick={toggleCollapse}>
          Chats
        </h2>

      
        <div className="overflow-y-auto p-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 mb-4 rounded-md"
          />
          <button 
            onClick={() => {
              window.location.href = '/upload';
            }}
            className="bg-blue-500 w-full text-white px-4 py-2 flex justify-center items-center rounded-md mb-4"
          >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
</svg>

          </button>
          <ul className="list-none p-0">
            {filteredChats.map(chat => (
              <li
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className="cursor-pointer p-2 text-white bg-slate-600 transition-colors hover:bg-slate-500 mb-1 rounded"
              >
                {chat.name}
              </li>
            ))}
          </ul>
        </div>
        </div>
        
      )}

      {collapsed && (
        <div className="flex justify-end pr-3 cursor-pointer items-center h-full" onClick={toggleCollapse}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ChatList;

