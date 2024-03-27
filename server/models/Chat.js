const mongoose = require('mongoose');
const Pdf = require('./Pdf');



const ChatSchema = new mongoose.Schema(
    {
        pdfId :{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Pdf',
            required: true
        },
        prevChats : {
            type : Array,
            default:[]
        }
    }
)

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;