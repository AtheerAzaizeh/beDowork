const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");

console.log("Setting up education routes");

router.post("/", educationController.create);
router.get("/", educationController.findAll);
router.get("/cv/:cv_id", educationController.findByCVId);
router.put("/:id", educationController.update);
router.delete("/:id", educationController.delete);

module.exports = router;
