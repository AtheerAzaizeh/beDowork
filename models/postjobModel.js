const db = require('../config/db');

const postJob = (jobDetails, callback) => {
    const { employer_id, title, description, location, salary, skill } = jobDetails;
    const query = 'INSERT INTO tbl_108_dowork_Jobs (employer_id, title, description, location, salary, skill) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [employer_id, title, description, location, salary, skill], (err, results) => {
        if (err) throw err;
        callback(results.insertId);
    });
};

module.exports = {
    postJob
};
