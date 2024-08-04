const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const jobSeekerController = require("../controllers/jobSeekerController");

console.log("Setting up job seeker routes");

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("profile-picture"), (req, res) => {
  console.log("POST /jobSeekers");
  jobSeekerController.create(req, res);
});

router.get("/", (req, res) => {
  console.log("GET /jobSeekers");
  jobSeekerController.findAll(req, res);
});

router.get("/:id", (req, res) => {
  console.log("GET /jobSeekers/:id");
  jobSeekerController.findById(req, res);
});

router.put("/:id", (req, res) => {
  console.log("PUT /jobSeekers/:id");
  jobSeekerController.update(req, res);
});

router.delete("/:id", (req, res) => {
  console.log("DELETE /jobSeekers/:id");
  jobSeekerController.delete(req, res);
});

module.exports = router;
