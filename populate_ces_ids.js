const mysql = require('mysql2/promise');

async function populateCESIds() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'F@d3', // replace with your MySQL password
    database: 'physical_evolution', // replace with your MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    for (let i = 1; i <= 400; i++) {
      const id = `CES${i}`;
      const password = 'PE@123';
      await pool.query('INSERT INTO cid (id, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)', [id, password]);
      console.log(`Inserted/Updated ${id}`);
    }
    console.log('All CES IDs populated successfully.');
  } catch (err) {
    console.error('Error populating CES IDs:', err);
  } finally {
    await pool.end();
  }
}

populateCESIds();
