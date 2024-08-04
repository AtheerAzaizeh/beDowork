const WorkExperience = require("../models/workExperienceModel");

exports.create = (req, res) => {
  console.log("Creating a new work experience:", req.body);
  const newWorkExperience = {
    cv_id: req.body.cv_id,
    work_name: req.body.work_name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };

  WorkExperience.create(newWorkExperience, (err, result) => {
    if (err) {
      console.error("Error creating work experience:", err);
      res.status(500).send("Error creating work experience");
      return;
    }
    console.log("Work experience created:", result);
    res.status(201).send("Work experience created");
  });
};

exports.findAll = (req, res) => {
  console.log("Fetching all work experiences");
  WorkExperience.findAll((err, results) => {
    if (err) {
      console.error("Error fetching work experiences:", err);
      res.status(500).send("Error fetching work experiences");
      return;
    }
    console.log("Work experiences fetched:", results);
    res.json(results);
  });
};

exports.findByCVId = (req, res) => {
  const cv_id = req.params.cv_id;
  console.log(`Fetching work experiences with cv_id: ${cv_id}`);

  WorkExperience.findByCVId(cv_id, (err, results) => {
    if (err) {
      console.error("Error fetching work experiences:", err);
      res.status(500).send("Error fetching work experiences");
      return;
    }
    if (!results) {
      console.log(`Work experiences with cv_id ${cv_id} not found`);
      res.status(404).send("Work experiences not found");
      return;
    }
    console.log(`Work experiences with cv_id ${cv_id} fetched:`, results);
    res.json(results);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(`Deleting work experience with id: ${id}`);

  WorkExperience.delete(id, (err, result) => {
    if (err) {
      console.error("Error deleting work experience:", err);
      res.status(500).send("Error deleting work experience");
      return;
    }
    if (result.affectedRows === 0) {
      console.log(`Work experience with id ${id} not found`);
      res.status(404).send("Work experience not found");
      return;
    }
    console.log(`Work experience with id ${id} deleted:`, result);
    res.send("Work experience deleted");
  });
};
