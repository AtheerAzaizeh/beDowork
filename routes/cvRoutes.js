const express = require("express");
const multer = require('multer');
const router = express.Router();
const cvController = require("../controllers/cvController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'please upload photo' });
  }
  const photoUrl = `/uploads/${req.file.filename}`;
  res.send({ message: "downlaoded photo ", photoUrl: photoUrl });
});

console.log("Setting up CV routes");

router.post("/", (req, res) => {
  console.log("POST /cvs");
  cvController.createCV(req, res);
});

router.get("/", (req, res) => {
  console.log("GET /cvs");
  cvController.getAllCVs(req, res);
});

router.get("/:id", (req, res) => {
  console.log("GET /cvs/:id");
  cvController.getCV(req, res);
});

router.put("/:job_seeker_id", (req, res) => {
  console.log("PUT /cvs/:id");
  cvController.updateCV(req, res);
});

router.delete("/:job_seeker_id", (req, res) => {
  console.log("DELETE /cvs/:id");
  cvController.deleteCV(req, res);
});

router.get('/cvs/seeker',(req , res) =>{
  cvController.getAllCVss(req,res);
});

module.exports = router;
