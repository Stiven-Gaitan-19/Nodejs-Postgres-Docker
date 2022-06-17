const { Pool } = require('pg');
require('dotenv').config();

async function executeQuery(query) {
	let options = {
		connectionString: process.env.DATABASE_URL
	};

	if (process.env.NODE_ENV !== 'development') {
		options.ssl = {
			rejectUnauthorized: false,
		};
	}
  
	let pool = new Pool(options);
	let client = await pool.connect();
	let result = await client.query(query);
	await client.release();
	return result;
}

module.exports = { executeQuery };
