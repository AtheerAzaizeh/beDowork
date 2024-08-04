const db = require('../config/db');

exports.createJobSeeker = async (jobSeeker) => {
  const query = "INSERT INTO tbl_108_dowork_JobSeekers (username, password, email, skills, profile_picture) VALUES (?, ?, ?, ?, ?)";
  const values = [
    jobSeeker.username,
    jobSeeker.password,
    jobSeeker.email,
    jobSeeker.skills || null,
    jobSeeker.profile_picture || null
  ];

  console.log("Executing query:", query);
  console.log("With values:", values);

  try {
    const [result] = await db.execute(query, values);
    return result;
  } catch (error) {
    console.error("Error creating Job Seeker:", error.message);
    throw error;
  }
};

exports.createEmployeeSeeker = async (employeeSeeker) => {
  const query = "INSERT INTO tbl_108_dowork_EmployeeSeekers (username, password, email, profile_picture) VALUES (?, ?, ?, ?)";
  const values = [
    employeeSeeker.username,
    employeeSeeker.password,
    employeeSeeker.email,
    employeeSeeker.profile_picture || null
  ];

  console.log("Executing query:", query);
  console.log("With values:", values);

  try {
    const [result] = await db.execute(query, values);
    return result;
  } catch (error) {
    console.error("Error creating Employee Seeker:", error.message);
    throw error;
  }
};

exports.findJobSeekerByEmail = async (email) => {
  const query = "SELECT * FROM tbl_108_dowork_JobSeekers WHERE email = ?";
  const values = [email];

  console.log("Executing query:", query);
  console.log("With values:", values);

  try {
    const [results] = await db.execute(query, values);
    return results;
  } catch (error) {
    console.error("Error finding Job Seeker by email:", error.message);
    throw error;
  }
};

exports.findEmployeeSeekerByEmail = async (email) => {
  const query = "SELECT * FROM tbl_108_dowork_EmployeeSeekers WHERE email = ?";
  const values = [email];

  console.log("Executing query:", query);
  console.log("With values:", values);

  try {
    const [results] = await db.execute(query, values);
    return results;
  } catch (error) {
    console.error("Error finding Employee Seeker by email:", error.message);
    throw error;
  }
};

exports.findUserByEmail = async (email) => {
  try {
    const jobSeekerResults = await this.findJobSeekerByEmail(email);
    if (jobSeekerResults.length > 0) {
      return jobSeekerResults;
    }

    const employeeSeekerResults = await this.findEmployeeSeekerByEmail(email);
    return employeeSeekerResults;
  } catch (error) {
    console.error("Error finding user by email:", error.message);
    throw error;
  }
};