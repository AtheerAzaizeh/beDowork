const { executeQuery } = require("../config/dbHelper");
const jobseeker = require('../models/jobSeekerModel');
const CV = {
  create: async (cv) => {
    const query = "INSERT INTO tbl_108_dowork_CVs (job_seeker_id, resume_url) VALUES (?, ?)";
    const values = [cv.job_seeker_id, cv.resume_url || null];
    console.log("Executing query:", query, values);
    if (values.includes(undefined)) {
      throw new Error("Bind parameters must not contain undefined.");
    }
    return executeQuery(query, values);
  },
  
  addSkill: async (cv_id, skill) => {
    const query = "INSERT INTO tbl_108_dowork_Skills (cv_id, skill) VALUES (?, ?)";
    const values = [cv_id, skill];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },
  
  addWorkExperience: async (cv_id, workExperience) => {
    const query = "INSERT INTO tbl_108_dowork_WorkExperiences (cv_id, work_name, start_date, end_date) VALUES (?, ?, ?, ?)";
    const values = [cv_id, workExperience.work_name, workExperience.start_date, workExperience.end_date];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },
  
  addEducation: async (cv_id, education) => {
    const query = "INSERT INTO tbl_108_dowork_Education (cv_id, academic_name, start_date, end_date) VALUES (?, ?, ?, ?)";
    const values = [cv_id, education.academic_name, education.start_date, education.end_date];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },
  findById: async (cv_id) => {
    const cvQuery = "SELECT * FROM tbl_108_dowork_CVs WHERE cv_id = ?";
    const skillsQuery = "SELECT * FROM tbl_108_dowork_Skills WHERE cv_id = ?";
    const workExperiencesQuery = "SELECT * FROM tbl_108_dowork_WorkExperiences WHERE cv_id = ?";
    const educationQuery = "SELECT * FROM tbl_108_dowork_Education WHERE cv_id = ?";

    const [cv] = await executeQuery(cvQuery, [cv_id]);
    const skills = await executeQuery(skillsQuery, [cv_id]);
    const workExperiences = await executeQuery(workExperiencesQuery, [cv_id]);
    const education = await executeQuery(educationQuery, [cv_id]);

    return {
      ...cv,
      skills,
      workExperiences,
      education,
    };
},
findByjobseekerId: async (id) => {
  const cvQuery = "SELECT * FROM tbl_108_dowork_CVs WHERE job_seeker_id = ?";
  const skillsQuery = "SELECT * FROM tbl_108_dowork_Skills WHERE job_seeker_id = ?";
  const workExperiencesQuery = "SELECT * FROM tbl_108_dowork_WorkExperiences WHERE job_seeker_id = ?";
  const educationQuery = "SELECT * FROM tbl_108_dowork_Education WHERE job_seeker_id = ?";

  const [cv] = await executeQuery(cvQuery, [jobseeker.job_seeker_id]);
  const skills = await executeQuery(skillsQuery, [jobseeker.job_seeker_id]);
  const workExperiences = await executeQuery(workExperiencesQuery, [jobseekerjob_seeker_id]);
  const education = await executeQuery(educationQuery, [jobseeker.job_seeker_id]);

  return {
    ...jobseeker,
    ...cv,
    skills,
    workExperiences,
    education,
  };
},
deleteByJobSeekerId: async (job_seeker_id) => {
  const [existingCV] = await executeQuery("SELECT cv_id FROM tbl_108_dowork_CVs WHERE job_seeker_id = ?", [job_seeker_id]);

  if (!existingCV) {
    throw new Error(`No CV found for job_seeker_id: ${job_seeker_id}`);
  }

  const cv_id = existingCV.cv_id;

  await executeQuery("DELETE FROM tbl_108_dowork_Skills WHERE cv_id = ?", [cv_id]);
  await executeQuery("DELETE FROM tbl_108_dowork_WorkExperiences WHERE cv_id = ?", [cv_id]);
  await executeQuery("DELETE FROM tbl_108_dowork_Education WHERE cv_id = ?", [cv_id]);
  await executeQuery("DELETE FROM tbl_108_dowork_CVs WHERE cv_id = ?", [cv_id]);

  return { message: `CV and related data for job_seeker_id ${job_seeker_id} deleted successfully` };
},

updateByJobSeekerId: async (job_seeker_id, cv) => {
  const [existingCV] = await executeQuery("SELECT cv_id FROM tbl_108_dowork_CVs WHERE job_seeker_id = ?", [job_seeker_id]);

  if (!existingCV) {
    throw new Error(`No CV found for job_seeker_id: ${job_seeker_id}`);
  }

  const cv_id = existingCV.cv_id;
  const cvQuery = "UPDATE tbl_108_dowork_CVs SET resume_url = ? WHERE job_seeker_id = ?";
  const cvValues = [cv.resume_url, job_seeker_id];
  await executeQuery(cvQuery, cvValues);

  await executeQuery("DELETE FROM tbl_108_dowork_Skills WHERE cv_id = ?", [cv_id]);
  await executeQuery("DELETE FROM tbl_108_dowork_WorkExperiences WHERE cv_id = ?", [cv_id]);
  await executeQuery("DELETE FROM tbl_108_dowork_Education WHERE cv_id = ?", [cv_id]);

  if (cv.skills && cv.skills.length > 0) {
    for (const skill of cv.skills) {
      await CV.addSkill(cv_id, skill);
    }
  }

  if (cv.workExperiences && cv.workExperiences.length > 0) {
    for (const workExperience of cv.workExperiences) {
      await CV.addWorkExperience(cv_id, workExperience);
    }
  }

  if (cv.education && cv.education.length > 0) {
    for (const edu of cv.education) {
      await CV.addEducation(cv_id, edu);
    }
  }

  return await CV.findById(cv_id);
},
findAll: async () => {
  const cvsQuery = "SELECT * FROM tbl_108_dowork_CVs";
  const skillsQuery = "SELECT * FROM tbl_108_dowork_Skills WHERE cv_id IN (SELECT cv_id FROM tbl_108_dowork_CVs)";
  const workExperiencesQuery = "SELECT * FROM tbl_108_dowork_WorkExperiences WHERE cv_id IN (SELECT cv_id FROM tbl_108_dowork_CVs)";
  const educationQuery = "SELECT * FROM tbl_108_dowork_Education WHERE cv_id IN (SELECT cv_id FROM tbl_108_dowork_CVs)";

  const cvs = await executeQuery(cvsQuery);
  const skills = await executeQuery(skillsQuery);
  const workExperiences = await executeQuery(workExperiencesQuery);
  const education = await executeQuery(educationQuery);

  const cvMap = cvs.reduce((map, cv) => {
    map[cv.cv_id] = {
      ...cv,
      skills: [],
      workExperiences: [],
      education: [],
    };
    return map;
  }, {});

  skills.forEach(skill => cvMap[skill.cv_id].skills.push(skill));
  workExperiences.forEach(workExperience => cvMap[workExperience.cv_id].workExperiences.push(workExperience));
  education.forEach(edu => cvMap[edu.cv_id].education.push(edu));

  return Object.values(cvMap);
}
};

module.exports = CV;
