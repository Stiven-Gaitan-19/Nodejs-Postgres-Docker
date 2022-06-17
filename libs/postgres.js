const { Pool } = require('pg');
require('dotenv').config();

async function executeQuery(query) {
  let pool = new Pool({connectionString: process.env.DATABASE_URL});
  let client = await pool.connect();
  let result = await client.query(query);
  await client.release();
  return result;
}

module.exports = { executeQuery };
