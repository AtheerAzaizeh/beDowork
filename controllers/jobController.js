const Job = require("../models/jobModel");

exports.create = async (req, res) => {
  const { employer_id, title, description, location, salary, skill } = req.body;

  if (!employer_id) {
    return res.status(400).json({ message: "Invalid employer_id" });
  }

  try {
    const jobData = {
      employer_id: employer_id,
      title: title || null,
      description: description || null,
      location: location || null,
      salary: salary || null,
      skill: skill || null,
    };

    const result = await Job.create(jobData);
    res.status(201).json({ message: "Job created successfully", jobId: result.insertId });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ message: "Error creating job" });
  }
};

exports.getJobsForYou = async (req, res) => {
  const skills = req.query.skills ? req.query.skills.split(",") : [];
  console.log("Fetching jobs for you with skills:", skills);

  try {
    const jobs = await Job.findBySkills(skills);
    console.log("Jobs fetched:", jobs);
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllJobsWithCompanyDetails = async (req, res) => {
  try {
    const jobs = await Job.findAllWithCompanyDetails();
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

exports.getJobsBySkillsOfJobSeeker = async (req, res) => {
  const job_seeker_id = req.params.job_seeker_id;

  try {
    const jobs = await Job.findBySkillsOfJobSeeker(job_seeker_id);
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs by skills:", err);
    res.status(500).json({ message: "Error fetching jobs by skills" });
  }
};

exports.searchJobs = async (req, res) => {
  const searchTerm = req.query.q;

  try {
    const jobs = await Job.searchJobs(searchTerm);
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error searching jobs:", err);
    res.status(500).json({ message: "Error searching jobs" });
  }
};

exports.findAll = async (req, res) => {
  console.log("Fetching all jobs");

  try {
    const results = await Job.findAll();
    console.log("Jobs fetched:", results);
    res.json(results);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).send("Error fetching jobs");
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  console.log(`Fetching job with id: ${id}`);

  try {
    const result = await Job.findById(id);
    if (!result) {
      console.log(`Job with id ${id} not found`);
      res.status(404).send("Job not found");
      return;
    }
    console.log(`Job with id ${id} fetched:`, result);
    res.json(result);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).send("Error fetching job");
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  console.log(`Updating job with id: ${id}`);
  const updatedJob = {
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    salary: req.body.salary,
    skill: req.body.skill,
  };

  try {
    const result = await Job.update(id, updatedJob);
    if (result.affectedRows === 0) {
      console.log(`Job with id ${id} not found`);
      res.status(404).send("Job not found");
      return;
    }
    console.log(`Job with id ${id} updated:`, result);
    res.send("Job updated");
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).send("Error updating job");
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  console.log(`Deleting job with id: ${id}`);

  try {
    const result = await Job.delete(id);
    if (result.affectedRows === 0) {
      console.log(`Job with id ${id} not found`);
      res.status(404).send("Job not found");
      return;
    }
    console.log(`Job with id ${id} deleted:`, result);
    res.send("Job deleted");
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).send("Error deleting job");
  }
};
