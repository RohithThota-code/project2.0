const express = require('express')
const router = express.Router() 
const { test, registerUser,loginUser,getProfile, logoutUser, saveScore,uploadImages } = require('../controllers/authController')
const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../photos')); // Ensure 'photos' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
    cb(null, `image_${uniqueSuffix}`);
  },
});

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});




router.get('/', test)     
router.post('/register', registerUser)
router.post('/login',loginUser)
router.get('/profile',getProfile)
router.post('/logout', logoutUser)
router.post('/save-score',saveScore)
router.post('/upload-images', upload.single('image'),uploadImages);



module.exports = router
