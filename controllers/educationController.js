const Education = require("../models/educationModel");

exports.create = async (req, res) => {
  console.log("Creating a new education:", req.body);
  const newEducation = {
    cv_id: req.body.cv_id,
    academic_name: req.body.academic_name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };

  try {
    const result = await Education.create(newEducation);
    console.log("Education created:", result);
    res.status(201).send("Education created");
  } catch (err) {
    console.error("Error creating education:", err);
    res.status(500).send("Error creating education");
  }
};

exports.findAll = async (req, res) => {
  console.log("Fetching all education entries");
  try {
    const results = await Education.findAll();
    console.log("Education entries fetched:", results);
    res.json(results);
  } catch (err) {
    console.error("Error fetching education entries:", err);
    res.status(500).send("Error fetching education entries");
  }
};

exports.findByCVId = async (req, res) => {
  const cv_id = req.params.cv_id;
  console.log(`Fetching education entries with cv_id: ${cv_id}`);

  try {
    const results = await Education.findByCVId(cv_id);
    if (!results) {
      console.log(`Education entries with cv_id ${cv_id} not found`);
      res.status(404).send("Education entries not found");
      return;
    }
    console.log(`Education entries with cv_id ${cv_id} fetched:`, results);
    res.json(results);
  } catch (err) {
    console.error("Error fetching education entries:", err);
    res.status(500).send("Error fetching education entries");
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  console.log(`Updating education with id: ${id}`);
  const updatedEducation = {
    academic_name: req.body.academic_name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };

  try {
    const result = await Education.update(id, updatedEducation);
    if (result.affectedRows === 0) {
      console.log(`Education with id ${id} not found`);
      res.status(404).send("Education not found");
      return;
    }
    console.log(`Education with id ${id} updated:`, result);
    res.send("Education updated");
  } catch (err) {
    console.error("Error updating education:", err);
    res.status(500).send("Error updating education");
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  console.log(`Deleting education with id: ${id}`);

  try {
    const result = await Education.delete(id);
    if (result.affectedRows === 0) {
      console.log(`Education with id ${id} not found`);
      res.status(404).send("Education not found");
      return;
    }
    console.log(`Education with id ${id} deleted:`, result);
    res.send("Education deleted");
  } catch (err) {
    console.error("Error deleting education:", err);
    res.status(500).send("Error deleting education");
  }
};
