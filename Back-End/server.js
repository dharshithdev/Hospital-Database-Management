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

app.post('/patient', (req, res) => {
    const {name, age, gender, cause, status} = req.body;
    const sql = `INSERT INTO patients (name, age, gender, cause) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, age, gender, cause, status], (err, result) => {
        if (err) throw err;
        res.send('Patient added Successfully');
    });
});

app.get('/patient', (req, res) => {
    const sql = `SELECT * FROM patients`; // Ensure this matches your table name
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching patients:', err);
            res.status(500).send('Server Error');
        } else {
            res.send(results);
        }
    });
});

app.put('/patient', (req, res) => {
    const {name, age, gender, cause, status} = req.body;
    const {id} = req.params;
    const sql = `UPDATE patients SET name = ?, age = ?, gender = ?, cause = ?, status = ? WHERE id = ?`;
    db.query(sql, [name, age, gender, cause, status, id], (err, results) => {
        if (err) throw err;
        res.send('Patient Updated Successfully');
    });
});

app.delete('/patient', (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM patients WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send('Patient Deleted Successfully');
    });
});

// Doctors

app.post('/doctor', (req, res) => {
    const {name, dept, gender} = req.body;
    sql = `INSERT INTO doctors (name, dept, gender) VALUES (?, ?, ?)`;
    db.query(sql, [name, dept, gender], (err, result) => {
        if (err) throw err;
        res.send('Doctor Added Successfully');
    });
});

app.get('/doctor', (req, res) => {
    sql = `SELECT * FROM doctors`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.put('/doctor', (req, res) => {
    const {name, dept, gender} = req.body;
    const {id} = req.params;
    sql =  `UPDATE doctors SET name = ?, dept = ?, gender = ? WHERE id = ?`;
    db.query(sql, [name, dept, gender, id], (err, results) => {
        if (err) throw err;
        req.send('Updated Successfully');
    });
});

app.delete('/doctor', (req, res) => {
    const {id} = req.params;
    sql =  `DELETE FROM doctors WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        req.send('Deleted Successfully');
    });
});

// Staffs

app.listen(5000, () => {
        console.log('Server Running on Port 5000');
})