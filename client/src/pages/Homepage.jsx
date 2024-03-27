import React,{useEffect, useState} from 'react'
import ChatList from '../components/Chatlist';
import Chat from '../components/Chat';
import PdfViewer from '../components/Pdfviewer';
import axios from 'axios';

function Homepage() {
  //get the pdfs and map them to chats

  const [pdfs,setPdfs]=useState([]);
  const [chats,setChats]=useState([]);
  
  useEffect(() => {
    const fetchPdfs = async () => {
      const response = await axios.get('http://localhost:3000/api/user/bulk', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPdfs(response.data.pdfs);
    }
    fetchPdfs();
  }, []);
  
  useEffect(() => {
    const newchats = pdfs.map((pdf) => ({
      id: pdf._id,
      name: pdf.publicId,
      pdfUrl : pdf.pdfUrl,
    }));
    setChats(newchats);
    console.log("pdfs = ",pdfs)
    console.log("chats = ",chats);
  }, [pdfs]);
  

  
  const [pdfUrl,setPdfUrl] = useState('');

  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setPdfUrl(chat.pdfUrl);
  };

  return (
    <div className="flex h-screen">
      
      {pdfUrl && <div className='w-1/2 ml-12'>
        <PdfViewer url={pdfUrl} />
      </div>}
      
      {selectedChat && <Chat chat={selectedChat} />}
      <div className=''>
        <ChatList  chats={chats} onSelectChat={handleSelectChat} />
      </div>
      
    </div>
  );
};
export default Homepage
