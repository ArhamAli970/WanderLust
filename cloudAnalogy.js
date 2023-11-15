const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.CLOUDAPIKEY,
    api_secret:process.env.CLOUDAPISECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats: ["png","jpg","jpeg"] // supports promises as well
    //   public_id: (req, file) => 'computed-filename-using-request',
    },
  });

  module.exports={cloudinary,storage};