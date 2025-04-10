const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

connection.query('SELECT * FROM users', (err, result) => {
    if (err) throw err;
    console.log(result);
});

connection.end();
