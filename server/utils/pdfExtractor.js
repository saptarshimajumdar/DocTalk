const axios = require('axios');
const PDFParser = require('pdf-parse');

const extractTextFromPDF= async(pdfUrl) =>{
  try {
    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });

    const pdfData = response.data;
    const pdfText = await PDFParser(pdfData);

    const text = pdfText.text;

    return text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
}

module.exports = extractTextFromPDF;