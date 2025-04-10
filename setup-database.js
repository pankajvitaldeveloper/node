const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    // Don't specify a database initially
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL server');
    
    // Create database if it doesn't exist
    connection.query('CREATE DATABASE IF NOT EXISTS node', (err) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database created or already exists');
        
        // Use the database
        connection.query('USE node', (err) => {
            if (err) {
                console.error('Error using database:', err);
                return;
            }
            
            // Create users table
            const createTableSQL = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            
            connection.query(createTableSQL, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                    return;
                }
                console.log('Users table created or already exists');
                
                // Insert some sample data
                // const insertDataSQL = `
                //     INSERT INTO users (name, email) 
                //     VALUES 
                //         ('John Doe', 'john@example.com'),
                //         ('Jane Smith', 'jane@example.com')
                //     ON DUPLICATE KEY UPDATE name=name
                // `;
                
                connection.query(insertDataSQL, (err) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        return;
                    }
                    console.log('Sample data inserted');
                    
                    // Close the connection
                    connection.end();
                });
            });
        });
    });
}); 