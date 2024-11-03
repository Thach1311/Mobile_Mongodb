const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'user_database',
    port: 3307  
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Endpoint for user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving user to database' });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Both email and password are required' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.status(200).json({ message: 'Logged in successfully!', user: { id: user.id, username: user.username, email: user.email } });
        });
    });
});

// Example endpoint to get data
app.get('/data', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint to get user details by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    db.query('SELECT id, username, email FROM users WHERE id = ?', [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(results[0]);
    });
});

// Endpoint to update user details
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
    }

    const updates = [];
    const params = [username, email, userId];

    if (password) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        updates.push(`password = ?`);
        params.unshift(hash);
    }

    updates.push(`username = ?`, `email = ?`);

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    
    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating user data' });
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Endpoint to delete user account
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting user' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Listen for requests
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});