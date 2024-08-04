const express = require('express');
const router = express.Router();
const multer = require('multer');
const registerController = require('../controllers/registerController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/register-jobseeker', upload.single('profile_picture'), registerController.registerJobSeeker);
router.post('/register-employeeseeker', upload.single('profile_picture'), registerController.registerEmployeeSeeker);


module.exports = router;
