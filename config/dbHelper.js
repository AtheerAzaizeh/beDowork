const pool = require('./db');

async function executeQuery(query, values) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { executeQuery };
