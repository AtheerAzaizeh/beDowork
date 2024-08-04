const CV = require('../models/cvModel');
const JobSeeker = require('../models/JobSeekerModel');

exports.createCV = async (req, res) => {
  const { job_seeker_id, resume_url, skills, workExperiences, education } = req.body;

  if (!job_seeker_id) {
      return res.status(400).json({ message: "job_seeker_id is required" });
  }

  try {
      const cvResult = await CV.create({ job_seeker_id, resume_url });
      const cv_id = cvResult.insertId;

      if (skills && skills.length > 0) {
          for (const skill of skills) {
              await CV.addSkill(cv_id, skill);
          }
      }

      if (workExperiences && workExperiences.length > 0) {
          for (const workExperience of workExperiences) {
              await CV.addWorkExperience(cv_id, workExperience);
          }
      }

      if (education && education.length > 0) {
          for (const edu of education) {
              await CV.addEducation(cv_id, edu);
          }
      }

      res.status(201).json({ message: "CV created successfully", cv_id });
  } catch (err) {
      console.error("Error creating CV:", err);
      res.status(500).json({ message: "Error creating CV" });
  }
};
  exports.getCV = async (req, res) => {
    const cv_id = req.params.id;

    try {
      const cv = await CV.findById(cv_id);
      res.status(200).json(cv);
    } catch (err) {
      console.error("Error fetching CV:", err);
      res.status(500).json({ message: "Error fetching CV" });
    }
  };

  exports.getAllCVs = async (req, res) => {
    try {
      const cvs = await CV.findAll();
      res.status(200).json(cvs);
    } catch (err) {
      console.error("Error fetching CVs:", err);
      res.status(500).json({ message: "Error fetching CVs" });
    }
  };
  exports.updateCV = async (req, res) => {
    const job_seeker_id = req.params.job_seeker_id;
    const { resume_url, skills, workExperiences, education } = req.body;
  
    try {
      const updatedCV = await CV.updateByJobSeekerId(job_seeker_id, { resume_url, skills, workExperiences, education });
      res.status(200).json({ message: "CV updated successfully", updatedCV });
    } catch (err) {
      if (err.message.includes('No CV found for job_seeker_id')) {
        res.status(404).json({ message: err.message });
      } else {
        console.error("Error updating CV:", err);
        res.status(500).json({ message: "Error updating CV" });
      }
    }
  };

  exports.getAllCVss = (req, res) => {
    const query = `
     select * from tbl_108_dowork_CVs
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving CVs:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
};

  exports.deleteCV = async (req, res) => {
    const job_seeker_id = req.params.job_seeker_id;
  
    try {
      const result = await CV.deleteByJobSeekerId(job_seeker_id);
      res.status(200).json(result);
    } catch (err) {
      if (err.message.includes('No CV found for job_seeker_id')) {
        res.status(404).json({ message: err.message });
      } else {
        console.error("Error deleting CV:", err);
        res.status(500).json({ message: "Error deleting CV" });
      }
    }
  };
