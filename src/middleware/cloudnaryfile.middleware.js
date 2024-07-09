const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Multer-Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: (req, file) => path.extname(file.originalname).slice(1),
    public_id: (req, file) => file.fieldname + '-' + Date.now()
  }
});

const parser = multer({ storage: storage });

module.exports = { parser };
