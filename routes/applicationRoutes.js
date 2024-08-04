const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

console.log("Setting up applications routes");

router.post("/", applicationController.createApplication);
router.get("/", applicationController.getAllApplications);
router.get("/:id", applicationController.getApplication);
router.get("/jobSeeker/:job_seeker_id", applicationController.getApplicationsByJobSeeker);
router.get("/job/:job_id", applicationController.getApplicationsByJob);
router.put("/:id", applicationController.updateApplication);
router.delete("/:id", applicationController.deleteApplication);

module.exports = router;
