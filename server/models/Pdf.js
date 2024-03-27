const mongoose = require('mongoose');
const User = require('./User');



const PdfSchema = new mongoose.Schema(
    {
        pdfUrl :{
            type : String,
            required : true
        },
        publicId :{
            type : String,
            required : true
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required : true
        }
    },
)

const Pdf = mongoose.model('Pdf', PdfSchema);

module.exports = Pdf;