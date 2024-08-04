const Employer = require("../models/employerModel");

exports.createEmployer = async (req, res) => {
  const { employee_seeker_id, company_name, company_description, contact_email } = req.body;

  try {
    const result = await Employer.create({ employee_seeker_id, company_name, company_description, contact_email });
    res.status(201).json({ message: "Employer created successfully", employerId: result.insertId });
  } catch (err) {
    console.error("Error creating employer:", err);
    res.status(500).json({ message: "Error creating employer" });
  }
};

exports.findAll = async (req, res) => {
  console.log("Fetching all employers");

  try {
    const results = await Employer.findAll();
    console.log("Employers fetched:", results);
    res.json(results);
  } catch (err) {
    console.error("Error fetching employers:", err);
    res.status(500).send("Error fetching employers");
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  console.log(`Fetching employer with id: ${id}`);

  try {
    const result = await Employer.findById(id);
    if (!result) {
      console.log(`Employer with id ${id} not found`);
      res.status(404).send("Employer not found");
      return;
    }
    console.log(`Employer with id ${id} fetched:`, result);
    res.json(result);
  } catch (err) {
    console.error("Error fetching employer:", err);
    res.status(500).send("Error fetching employer");
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  console.log(`Updating employer with id: ${id}`);
  const updatedEmployer = {
    company_name: req.body.company_name,
    company_description: req.body.company_description,
    contact_email: req.body.contact_email,
    employee_seeker_id: req.body.employee_seeker_id,
  };

  try {
    const result = await Employer.update(id, updatedEmployer);
    if (result.affectedRows === 0) {
      console.log(`Employer with id ${id} not found`);
      res.status(404).send("Employer not found");
      return;
    }
    console.log(`Employer with id ${id} updated:`, result);
    res.send("Employer updated");
  } catch (err) {
    console.error("Error updating employer:", err);
    res.status(500).send("Error updating employer");
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  console.log(`Deleting employer with id: ${id}`);

  try {
    const result = await Employer.delete(id);
    if (result.affectedRows === 0) {
      console.log(`Employer with id ${id} not found`);
      res.status(404).send("Employer not found");
      return;
    }
    console.log(`Employer with id ${id} deleted:`, result);
    res.send("Employer deleted");
  } catch (err) {
    console.error("Error deleting employer:", err);
    res.status(500).send("Error deleting employer");
  }
};
exports.getEmployerByEmployeeSeekerId = async (req, res) => {
  const employeeSeekerId = req.params.employeeSeekerId;

  try {
    const employer = await Employer.findByEmployeeSeekerId(employeeSeekerId);
    if (employer.length > 0) {
      res.status(200).json(employer[0]);
    } else {
      res.status(404).json({ message: "Employer not found" });
    }
  } catch (err) {
    console.error("Error fetching employer by employee seeker ID:", err);
    res.status(500).json({ message: "Error fetching employer" });
  }
};
