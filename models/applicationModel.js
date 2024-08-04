const db = require("../config/db");

const Application = {
  create: async (application) => {
    const query = "INSERT INTO tbl_108_dowork_Applications (job_seeker_id, job_id, status) VALUES (?, ?, ?)";
    const values = [application.job_seeker_id, application.job_id, application.status];
    console.log("Executing query:", query, values); // Debugging statement
    const [result] = await db.query(query, values);
    return result;
  },

  findAll: async () => {
    const query = "SELECT * FROM tbl_108_dowork_Applications";
    console.log("Executing query:", query); // Debugging statement
    const [results] = await db.query(query);
    return results;
  },

  findById: async (id) => {
    const query = "SELECT * FROM tbl_108_dowork_Applications WHERE application_id = ?";
    console.log("Executing query:", query, [id]); // Debugging statement
    const [result] = await db.query(query, [id]);
    return result;
  },

  findByJobSeekerId: async (job_seeker_id) => {
    const query = "SELECT * FROM tbl_108_dowork_Applications WHERE job_seeker_id = ?";
    console.log("Executing query:", query, [job_seeker_id]); // Debugging statement
    const [results] = await db.query(query, [job_seeker_id]);
    return results;
  },

  findByJobId: async (job_id) => {
    const query = "SELECT * FROM tbl_108_dowork_Applications WHERE job_id = ?";
    console.log("Executing query:", query, [job_id]); // Debugging statement
    const [results] = await db.query(query, [job_id]);
    return results;
  },

  updateById: async (id, status) => {
    const query = "UPDATE tbl_108_dowork_Applications SET status = ? WHERE application_id = ?";
    const values = [status, id];
    console.log("Executing query:", query, values); // Debugging statement
    const [result] = await db.query(query, values);
    return result;
  },

  deleteById: async (id) => {
    const query = "DELETE FROM tbl_108_dowork_Applications WHERE application_id = ?";
    console.log("Executing query:", query, [id]); // Debugging statement
    const [result] = await db.query(query, [id]);
    return result;
  }
};

module.exports = Application;
