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

// get all list of all history
app.get('/allExpensedata/', (req, res) => {
    const sql = 'SELECT * FROM allexpensedata';
    db.query(sql, (err, result) => {
        if (err)
            return res.json({ Message: "Error inside the server" })
        return res.json(result)
    });
});

// create new list/Add post
app.post('/addExpensedata/', (req, res) => {
    const sql = "INSERT INTO allexpensedata (`date`,`purpose_title`, `deposit`,`withdraw`) VALUES (?, ?, ?, ?)";
    // console.log(req.body.type === 'withdraw')
    const expensePost = {
        date: req.body.date,
        purpose_title: req.body.purpose_title,
        deposit: req.body.type === 'deposit' ? req.body.amount : 0,
        withdraw: req.body.type === 'withdraw' ? req.body.amount : 0
    };
    const formData = [expensePost.date, expensePost.purpose_title, expensePost.deposit, expensePost.withdraw];
    console.log('GG', formData);
    db.query(sql, formData, (err, result) => {
        if (err)
            return res.send({ Message: "Error inside the server on post" });
        console.log(result)
        return res.send(result);
    });
});

// update or edit || create
app.put('/listUpdate/:id', (req, res) => {
    const id = req.params.id;
    console.log('kkk', req.body);
    const sql = 'UPDATE allexpensedata SET date = ?, purpose_title = ?, deposit = ?, withdraw = ? WHERE id = ?';
    const expenseUpdate = {
        id,
        date: req.body.date,
        purpose_title: req.body.purpose_title,
        deposit: req.body.type === 'deposit' ? req.body.amount : 0,
        withdraw: req.body.type === 'withdraw' ? req.body.amount : 0
    };
    db.query(sql, [expenseUpdate.date, expenseUpdate.purpose_title, expenseUpdate.deposit, expenseUpdate.withdraw, id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating exphistory.' });
        } else {
            res.json({ message: 'exphistory updated successfully.' });
        }
    });
});

// inital test
app.get('/', (req, res) => {
    res.send('Server is running...')
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


