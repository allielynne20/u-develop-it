const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const sqlite3 = require('sqlite3').verbose();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Check to make sure server is connecting to the port
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the election database.');
});

// GET all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    const params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a single candidate
// db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// Delete a candidate
// db.run(`DELETE FROM candidates WHERE id = ?`, 1, function (err) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(this.changes);
// });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
// ES5 function, not arrow function, to use this
db.run(sql, params, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result, this.lastID);
});

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
});

//old listen function that only connects to the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});