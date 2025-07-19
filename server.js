const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files for CSS, JS, images, and HTML pages
app.use('/CSS', express.static('CSS'));
app.use('/JS', express.static('JS'));
app.use('/img', express.static('img'));
app.use('/HTML', express.static('HTML'));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: 'F@d3', // replace with your MySQL password
  database: 'physical_evolution', // replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Routes

// Register new user
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user with first login password reset check
app.post('/api/login', async (req, res) => {
  const { email, id, password } = req.body;
  try {
    let user;
    if (id) {
      [user] = await pool.query('SELECT * FROM cid WHERE id = ? AND password = ?', [id, password]);
    } else if (email) {
      [user] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    } else {
      return res.status(400).json({ message: 'Missing login credentials' });
    }
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const userData = user[0];
    if (userData.is_first_login && userData.id && userData.id.startsWith('CES') && parseInt(userData.id.substring(3)) >= 1 && parseInt(userData.id.substring(3)) <= 400) {
      return res.status(200).json({ message: 'Password reset required', resetRequired: true, user: { id: userData.id } });
    }
    res.status(200).json({ message: 'Login successful', user: { id: userData.id || userData.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Password reset endpoint
app.post('/api/reset-password', async (req, res) => {
  const { id, newPassword } = req.body;
  try {
    const [result] = await pool.query('UPDATE cid SET password = ?, is_first_login = FALSE WHERE id = ?', [newPassword, id]);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check first login status endpoint
app.post('/api/check-first-login', async (req, res) => {
  const { id } = req.body;
  try {
    const [user] = await pool.query('SELECT is_first_login FROM cid WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isFirstLogin = user[0].is_first_login;
    res.status(200).json({ isFirstLogin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
