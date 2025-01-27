const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connection Successful');
});

app.post('/patients', (req, res) => {
    const {name, age, gender, cause, status} = req.body;
    const sql = `INSERT INTO patients (name, age, gender, cause) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, age, gender, cause, status], (err, result) => {
        if (err) throw err;
        res.send('Patient added Successfully');
    });
});

app.get('/patients', (req, res) => {
    const sql = `SELECT * FROM patients`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/patients', (req, res) => {
    const {name, age, gender, cause, status} = req.body;
    const {id} = req.params;
    const sql = `UPDATE patients SET name = ?, age = ?, gender = ?, cause = ?, status = ? WHERE id = ?`;
    db.query(sql, [name, age, gender, cause, status, id], (err, results) => {
        if (err) throw err;
        res.send('Patient Updated Successfully');
    });
});

app.delete('/patients', (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM patients WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send('Patient Deleted Successfully');
    });
});

app.listen(3000, () => {
        console.log('Server Running on Port 3000');
})