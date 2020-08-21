const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/database');

const apiRoutes = require('./routes/apiRoutes');

//Use apiRoutes 
app.use('/api', apiRoutes);

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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