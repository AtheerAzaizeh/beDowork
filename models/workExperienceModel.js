const db = require('../config/db');

const WorkExperience = {
  create: (workExperience, callback) => {
    const query = 'INSERT INTO tbl_108_dowork_WorkExperiences (cv_id, work_name, start_date, end_date) VALUES (?, ?, ?, ?)';
    console.log('Executing query:', query, workExperience);
    db.query(query, [workExperience.cv_id, workExperience.work_name, workExperience.start_date, workExperience.end_date], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }
      console.log('Query executed successfully:', result);
      callback(null, result);
    });
  },

  findAll: (callback) => {
    const query = 'SELECT * FROM tbl_108_dowork_WorkExperiences';
    console.log('Executing query:', query);
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }
      console.log('Query executed successfully:', results);
      callback(null, results);
    });
  },

  findByCVId: (cv_id, callback) => {
    const query = 'SELECT * FROM tbl_108_dowork_WorkExperiences WHERE cv_id = ?';
    console.log('Executing query:', query, cv_id);
    db.query(query, [cv_id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }
      console.log('Query executed successfully:', results);
      callback(null, results);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM tbl_108_dowork_WorkExperiences WHERE work_experience_id = ?';
    console.log('Executing query:', query, id);
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }
      console.log('Query executed successfully:', result);
      callback(null, result);
    });
  }
};

module.exports = WorkExperience;