const mysql = require('mysql');
const connection = require('./mysqlconfig');
const express = require('express');
const app = express();

// Add middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
   connection.query('SELECT * FROM users', (err, result) => {
    if (err) throw err;
    res.send(result);
   });
});

app.post('/', (req, res) => {
    connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [req.body.name, req.body.email], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/:id', (req, res) => {
    connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [req.body.name, req.body.email, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

