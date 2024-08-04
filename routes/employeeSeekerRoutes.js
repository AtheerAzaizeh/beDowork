const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const employeeSeekerController = require("../controllers/employeeSeekerController");

router.post("/", upload.single("profile-picture"), (req, res) => {
  console.log("POST /employeeSeekers");
  employeeSeekerController.create(req, res);
});

router.get("/", (req, res) => {
  console.log("GET /employeeSeekers");
  employeeSeekerController.findAll(req, res);
});

router.get("/:id", (req, res) => {
  console.log("GET /employeeSeekers/:id");
  employeeSeekerController.findById(req, res);
});

router.put("/:id", upload.single("profile-picture"), (req, res) => {
  console.log("PUT /employeeSeekers/:id");
  employeeSeekerController.update(req, res);
});

router.delete("/:id", (req, res) => {
  console.log("DELETE /employeeSeekers/:id");
  employeeSeekerController.delete(req, res);
});

module.exports = router;
