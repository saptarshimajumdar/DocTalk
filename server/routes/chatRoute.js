const express = require('express');
const Pdf = require('../models/Pdf');
const Chat = require('../models/Chat');
const OpenAI = require('openai');
const extractTextFromPDF = require('../utils/pdfExtractor');
const { authMiddleware } = require("../middlewares/authMiddleware");
require('dotenv').config()

const router  = express.Router();

router.use(express.json());
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

//for sending messages (called when send button is clicked)
router.post('/:pdfId',authMiddleware, async(req, res) => {

    const{message}= req.body;
    const pdfId = req.params.pdfId;
    const chat = await Chat.findOne({pdfId});
    if(!chat){
        res.status(404).json({
            message: "No chat found"
        })
    }

    let messages = chat.prevChats;
    messages.push({role : 'user', content : message});
    console.log(messages)
    const response = await openai.chat.completions.create({
        model : 'gpt-3.5-turbo',
        messages,
    })
    const aiMessage = response.choices[0].message;
    messages.push(aiMessage);
    
    chat.prevChats=messages;
    await chat.save();

    res.json({message: aiMessage})

})

//called when the chat is clicked on (to get the prev messages)
router.get('/:pdfId',authMiddleware, async(req, res) => {
    const pdfId = req.params.pdfId;
    const chat = await Chat.findOne({pdfId});
    const prevChats = chat?.prevChats;
    if(chat){
        res.json({
            prevChats 
        })
    }
    else {
        res.status(404).json({
            message: "Chat not found"
        }
    )}
})

//called when there are no prev messaages, to initalise the conversation 
router.post('/firstchat/:pdfId',authMiddleware, async(req, res) => {
    const pdfId = req.params.pdfId;
    const chat = await Chat.findOne({pdfId});

    const pdf = await Pdf.findOne({_id:pdfId});

    const extractedText = await extractTextFromPDF(pdf.pdfUrl);
    
    let messages=[
        {
            role : 'system',
            content : 'you are a helpful assistant. you will be given the contents of a pdf. be smart(ignore pagenumbers and out of context captions etc) and read it and answer based on the contents of the pdf.'
        },
        {
            role :'user', 
            content :`read this given file, summarise it and then answer on the basis of this pdf only. ans in short and in points. -> ${extractedText}`
        }
    ];
    const response = await openai.chat.completions.create({
        model : 'gpt-3.5-turbo',
        messages,
    })
    const message = response.choices[0].message;
    messages.push(message);

    chat.prevChats=messages;
    await chat.save();

    res.json({
        message 
    })
})

module.exports =router;
