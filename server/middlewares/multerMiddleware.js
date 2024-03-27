const multer = require('multer');

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = multer({
    storage
});

const uploadMiddleware = (req,res,next)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:"internal server error"})
        }
        next();
    })
}
module.exports= {
    upload,
    uploadMiddleware
}