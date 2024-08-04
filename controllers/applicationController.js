const Application = require('../models/applicationModel');

exports.createApplication = async (req, res) => {
  const { job_seeker_id, job_id, status } = req.body;
  console.log("Request body:", req.body); // Debugging statement

  try {
    const result = await Application.create({ job_seeker_id, job_id, status });
    res.status(201).json({ message: "Application created successfully", applicationId: result.insertId });
  } catch (err) {
    console.error("Error creating application:", err);
    res.status(500).json({ message: "Error creating application" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

exports.getApplication = async (req, res) => {
  const application_id = req.params.id;

  try {
    const application = await Application.findById(application_id);
    if (application.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application[0]);
  } catch (err) {
    console.error("Error fetching application:", err);
    res.status(500).json({ message: "Error fetching application" });
  }
};

exports.getApplicationsByJobSeeker = async (req, res) => {
  const job_seeker_id = req.params.job_seeker_id;

  try {
    const applications = await Application.findByJobSeekerId(job_seeker_id);
    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

exports.getApplicationsByJob = async (req, res) => {
  const job_id = req.params.job_id;

  try {
    const applications = await Application.findByJobId(job_id);
    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

exports.updateApplication = async (req, res) => {
  const application_id = req.params.id;
  const { status } = req.body;
  console.log("Updating application with ID:", application_id, "to status:", status); // Debugging statement

  try {
    const result = await Application.updateById(application_id, status);
    res.status(200).json({ message: "Application updated successfully" });
  } catch (err) {
    console.error("Error updating application:", err);
    res.status(500).json({ message: "Error updating application" });
  }
};

exports.deleteApplication = async (req, res) => {
  const application_id = req.params.id;
  console.log("Deleting application with ID:", application_id); // Debugging statement

  try {
    const result = await Application.deleteById(application_id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(500).json({ message: "Error deleting application" });
  }
};
