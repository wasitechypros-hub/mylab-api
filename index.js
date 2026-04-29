const express = require("express");
const { pool } = require("pg"); 
const app = express();

app.use(express.json());

const pool = new Pool({

  connectionString: 'postgresql://neondb_owner:npg_RuloSnyX0C6W@ep-delicate-cake-amxg7dx2-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: true
});


app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.post('/studentdata', async (req, res) => {
  const { id, name, email } = req.body; 
  try {
    const result = await pool.query(
      'INSERT INTO students (id, name, email) VALUES ($1, $2, $3) RETURNING *',
      [id, name, email]
    );
    res.status(201).json(result.rows[0]); 
  } catch (err) {
    res.status(500).send("Database Error: " + err.message);
  }
});

app.listen(3000, () => console.log("Server running"));
