const Skill = require("../models/skillModel");

exports.create = (req, res) => {
  console.log("Creating a new skill:", req.body);
  const newSkill = {
    cv_id: req.body.cv_id,
    skill: req.body.skill,
  };

  Skill.create(newSkill, (err, result) => {
    if (err) {
      console.error("Error creating skill:", err);
      res.status(500).send("Error creating skill");
      return;
    }
    console.log("Skill created:", result);
    res.status(201).send("Skill created");
  });
};

exports.findAll = (req, res) => {
  console.log("Fetching all skills");
  Skill.findAll((err, results) => {
    if (err) {
      console.error("Error fetching skills:", err);
      res.status(500).send("Error fetching skills");
      return;
    }
    console.log("Skills fetched:", results);
    res.json(results);
  });
};

exports.findByCVId = (req, res) => {
  const cv_id = req.params.cv_id;
  console.log(`Fetching skills with cv_id: ${cv_id}`);

  Skill.findByCVId(cv_id, (err, results) => {
    if (err) {
      console.error("Error fetching skills:", err);
      res.status(500).send("Error fetching skills");
      return;
    }
    if (!results) {
      console.log(`Skills with cv_id ${cv_id} not found`);
      res.status(404).send("Skills not found");
      return;
    }
    console.log(`Skills with cv_id ${cv_id} fetched:`, results);
    res.json(results);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(`Deleting skill with id: ${id}`);

  Skill.delete(id, (err, result) => {
    if (err) {
      console.error("Error deleting skill:", err);
      res.status(500).send("Error deleting skill");
      return;
    }
    if (result.affectedRows === 0) {
      console.log(`Skill with id ${id} not found`);
      res.status(404).send("Skill not found");
      return;
    }
    console.log(`Skill with id ${id} deleted:`, result);
    res.send("Skill deleted");
  });
};
