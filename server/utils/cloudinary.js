const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dtcosojhc', 
  api_key: '455112915311786', 
  api_secret: 'SzWZygmm2EbPikU1mj8Q92_divY' 
});

const cloudinaryUpload =async(localFilePath)=>{
  try {
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type: 'raw'
    });
  return response
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error.message);
    throw error;
  }
    
}  
const deleteFileFromCloudinary = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId,{
      resource_type: 'raw',
    });
    return response;
  } catch (error) {
    console.log("Error deleting file from Cloudinary:", error.message);
    throw error;
  }
};

module.exports ={cloudinaryUpload, deleteFileFromCloudinary};