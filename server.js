const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// middleware
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

// connect with mysql server
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'daily_expense-online'
});

// inital test
app.get('/', (req, res) => {
    res.send('Server is running...')
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


