const JobSeeker = require("../models/jobSeekerModel");
const Job = require("../models/jobModel");

exports.compareSkills = async (req, res) => {
  const { job_seeker_id } = req.params;

  try {
    const [jobSeekerSkillsResult] = await JobSeeker.findSkillsByJobSeekerId(job_seeker_id);

    if (!jobSeekerSkillsResult) {
      return res.status(404).json({ message: "Job seeker skills not found" });
    }

    const jobSeekerSkills = jobSeekerSkillsResult.skills.split(',').map(skill => skill.trim());

    const jobs = await Job.findAll();
    const matchingJobs = jobs.filter(job => {
      const jobSkills = job.skill.split(',').map(skill => skill.trim());
      return jobSeekerSkills.some(skill => jobSkills.includes(skill));
    });

    res.status(200).json({ jobs: matchingJobs });
  } catch (error) {
    console.error("Error comparing skills:", error);
    res.status(500).json({ message: "Server error" });
  }
};
