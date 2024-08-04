const db = require("../config/db");

const Education = {
  create: async (education) => {
    const query =
      "INSERT INTO tbl_108_dowork_Education (cv_id, academic_name, start_date, end_date) VALUES (?, ?, ?, ?)";
    console.log("Executing query:", query, education);
    const [result] = await db.query(query, [
      education.cv_id,
      education.academic_name,
      education.start_date,
      education.end_date,
    ]);
    return result;
  },

  findAll: async () => {
    const query = "SELECT * FROM tbl_108_dowork_Education";
    console.log("Executing query:", query);
    const [results] = await db.query(query);
    return results;
  },

  findByCVId: async (cv_id) => {
    const query = "SELECT * FROM tbl_108_dowork_Education WHERE cv_id = ?";
    console.log("Executing query:", query, cv_id);
    const [results] = await db.query(query, [cv_id]);
    return results;
  },

  update: async (id, education) => {
    const query =
      "UPDATE tbl_108_dowork_Education SET academic_name = ?, start_date = ?, end_date = ? WHERE education_id = ?";
    console.log("Executing query:", query, education, id);
    const [result] = await db.query(query, [
      education.academic_name,
      education.start_date,
      education.end_date,
      id,
    ]);
    return result;
  },

  delete: async (id) => {
    const query = "DELETE FROM tbl_108_dowork_Education WHERE education_id = ?";
    console.log("Executing query:", query, id);
    const [result] = await db.query(query, [id]);
    return result;
  },
};

module.exports = Education;
