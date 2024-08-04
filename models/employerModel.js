const { executeQuery } = require("../config/dbHelper");

const Employer = {
  create: async (employer) => {
    const query =
      "INSERT INTO tbl_108_dowork_Employers (company_name, company_description, contact_email, employee_seeker_id) VALUES (?, ?, ?, ?)";
    const values = [
      employer.company_name,
      employer.company_description,
      employer.contact_email,
      employer.employee_seeker_id,
    ];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },

  findAll: async () => {
    const query = "SELECT * FROM tbl_108_dowork_Employers";
    console.log("Executing query:", query);
    return executeQuery(query);
  },

  findById: async (id) => {
    const query =
      "SELECT * FROM tbl_108_dowork_Employers WHERE employer_id = ?";
    console.log("Executing query:", query, id);
    return executeQuery(query, [id]);
  },

  findByEmployeeSeekerId: async (employeeSeekerId) => {
    const query =
      "SELECT * FROM tbl_108_dowork_Employers WHERE employee_seeker_id = ?";
    console.log("Executing query:", query, employeeSeekerId);
    return executeQuery(query, [employeeSeekerId]);
  },

  update: async (id, employer) => {
    const query =
      "UPDATE tbl_108_dowork_Employers SET company_name = ?, company_description = ?, contact_email = ?, employee_seeker_id = ? WHERE employer_id = ?";
    const values = [
      employer.company_name,
      employer.company_description,
      employer.contact_email,
      employer.employee_seeker_id,
      id,
    ];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },

  delete: async (id) => {
    const query = "DELETE FROM tbl_108_dowork_Employers WHERE employer_id = ?";
    console.log("Executing query:", query, id);
    return executeQuery(query, [id]);
  },
};

module.exports = Employer;
