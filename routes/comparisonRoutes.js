const express = require('express');
const router = express.Router();
const comparisonController = require('../controllers/comparisonController');

router.get('/compare-skills/:job_seeker_id', comparisonController.compareSkills);

module.exports = router;
