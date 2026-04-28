const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

// Sirf EK BAAR pool declare karna hai
const pool = new Pool({
  connectionString: 'YOUR_NEON_LINK_HERE', // Apna link yahan dalein
  ssl: true
});

// GET Method
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Port change kar letay hain taake conflict na ho
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});