const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

console.log("Setting up job routes");

router.post("/", (req, res) => {
  console.log("POST /jobs");
  jobController.create(req, res);
});

router.get("/jobsforyou/:job_seeker_id", (req, res) => {
  console.log("GET /jobsforyou");
  jobController.getJobsBySkillsOfJobSeeker(req, res);
});

router.get("/", (req, res) => {
  console.log("GET /jobs");
  jobController.getAllJobsWithCompanyDetails(req, res);
});

router.get("/:id", (req, res) => {
  console.log("GET /jobs/:id");
  jobController.findById(req, res);
});

router.get("/search-jobs/search-jobs", (req, res) => {
  console.log("GET /jobs/search-jobs");
  jobController.searchJobs(req, res);
});

router.put("/:id", (req, res) => {
  console.log("PUT /jobs/:id");
  jobController.update(req, res);
});

router.delete("/:id", (req, res) => {
  console.log("DELETE /jobs/:id");
  jobController.delete(req, res);
});

module.exports = router;
