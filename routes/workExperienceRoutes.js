const express = require("express");
const router = express.Router();
const workExperienceController = require("../controllers/workExperienceController");

console.log("Setting up work experience routes");

router.post("/", (req, res) => {
  console.log("POST /workExperiences");
  workExperienceController.create(req, res);
});

router.get("/", (req, res) => {
  console.log("GET /workExperiences");
  workExperienceController.findAll(req, res);
});

router.get("/cv/:cv_id", (req, res) => {
  console.log("GET /workExperiences/cv/:cv_id");
  workExperienceController.findByCVId(req, res);
});

router.delete("/:id", (req, res) => {
  console.log("DELETE /workExperiences/:id");
  workExperienceController.delete(req, res);
});

module.exports = router;
