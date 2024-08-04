const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employerController");

console.log("Setting up employer routes");

router.post("/", (req, res) => {
  console.log("POST /employers");
  employerController.createEmployer(req, res);
});

router.get("/", (req, res) => {
  console.log("GET /employers");
  employerController.findAll(req, res);
});

router.get("/:id", (req, res) => {
  console.log("GET /employers/:id");
  employerController.findById(req, res);
});

router.put("/:id", (req, res) => {
  console.log("PUT /employers/:id");
  employerController.update(req, res);
});

router.delete("/:id", (req, res) => {
  console.log("DELETE /employers/:id");
  employerController.delete(req, res);
});

router.get('/employee-seeker/:employeeSeekerId', employerController.getEmployerByEmployeeSeekerId);

module.exports = router;
