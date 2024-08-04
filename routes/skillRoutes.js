const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");

console.log("Setting up skill routes");

router.post("/", (req, res) => {
  console.log("POST /skills");
  skillController.create(req, res);
});

router.get("/", (req, res) => {
  console.log("GET /skills");
  skillController.findAll(req, res);
});

router.get("/cv/:cv_id", (req, res) => {
  console.log("GET /skills/cv/:cv_id");
  skillController.findByCVId(req, res);
});

router.delete("/:id", (req, res) => {
  console.log("DELETE /skills/:id");
  skillController.delete(req, res);
});

module.exports = router;
