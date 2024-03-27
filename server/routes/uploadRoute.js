const express = require("express");
const path = require("path");
const {upload, uploadMiddleware} = require('../middlewares/multerMiddleware')
const router = express.Router();
const {cloudinaryUpload, deleteFileFromCloudinary} = require('../utils/cloudinary');
const Pdf = require('../models/Pdf');
const Chat = require('../models/Chat');
const { default: mongoose } = require("mongoose");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/upload", authMiddleware, upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file selected"
    });
  }

  const response = await cloudinaryUpload(req.file.path);

  console.log(response);

  if (response.secure_url) {
    try {
      const userId = req.userId;
      
      console.log(userId)

      const newPdf = await Pdf.create({
        pdfUrl: response.secure_url,
        publicId: response.public_id,
        userId : userId
      });
      console.log(newPdf);
      if (newPdf) {
        const chat = await Chat.create({
          pdfId: newPdf._id
        });
        console.log(chat)
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  res.status(200).json({ message: "File uploaded successfully.", filename: req.file.filename });
});


router.delete("/delete/:publicId", authMiddleware, async (req, res) => {
  try {
    const publicId = req.params.publicId;
    const pdf = await Pdf.findOne({publicId});
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Delete the file from Cloudinary
    const deletionResponse = await deleteFileFromCloudinary(pdf.publicId);

    if (deletionResponse.result !== 'ok') {
      return res.status(500).json({ message: "Failed to delete PDF from Cloudinary" });
    }

    // Delete the PDF record from the database
    await Pdf.findByIdAndDelete({_id : pdf._id });

    return res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Error deleting PDF:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
