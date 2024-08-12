const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL@password', // Replace with your MySQL root password
  database: 'flashcard_db'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Get all flashcards
app.get('/flashcards', (req, res) => {
    const query = 'SELECT * FROM flashcards';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching flashcards');
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new flashcard
  app.post('/flashcards', (req, res) => {
    const { question, answer } = req.body;
    const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(query, [question, answer], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while adding the flashcard');
      } else {
        res.status(201).send('Flashcard added successfully');
      }
    });
  });
  
  // Route to authenticate users
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while logging in');
    } else if (results.length > 0) {
      const user = results[0];
      res.json({ role: user.role });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

  
  // Update a flashcard
  app.put('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
    db.query(query, [question, answer, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the flashcard');
      } else {
        res.send('Flashcard updated successfully');
      }
    });
  });
  
  // Delete a flashcard
  app.delete('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM flashcards WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while deleting the flashcard');
      } else {
        res.send('Flashcard deleted successfully');
      }
    });
  });
  