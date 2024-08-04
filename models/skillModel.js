
const db = require('../config/db');

const Skill = {
  create: (skill, callback) => {
    const query = 'INSERT INTO tbl_108_dowork_Skills (cv_id, skill) VALUES (?, ?)';
    console.log('Executing query:', query, skill);
    db.query(query, [skill.cv_id, skill.skill], (err, result) => {
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
    const query = 'SELECT * FROM tbl_108_dowork_Skills';
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
    const query = 'SELECT * FROM tbl_108_dowork_Skills WHERE cv_id = ?';
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
    const query = 'DELETE FROM tbl_108_dowork_Skills WHERE skill_id = ?';
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

module.exports = Skill;
