// import lib
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const Q_SELECT_ALL_PRODUCT_QUERY = 'Select * From users';
const Q_INSERT_NEWUSER = 'Insert into Users(username,password) Values(?,?,?)';
const Q_SELECT_USERNAME = 'SELECT * FROM users WHERE username=? AND password=?';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
})

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());
app.use(express.json());

app.post('/Xc/registration', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const INSER_USERNAME = 'INSERT INTO users(username,password) VALUES(?,?)';
    connection.query(INSER_USERNAME, [username, password], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Succesfully added");
        }
    })
})
app.get('/', (req, res) => {
    res.send('go to /product to seee products');
})

app.post('/Xc/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query(Q_SELECT_USERNAME, [username, password], (err, result) => {
        if (err) {
            res.send({ error: err });
            console.log(err);
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "Wrong username/password combination" });
        }

    })
})

app.get('/Xc/Product', (req, res) => {
    connection.query(Q_SELECT_ALL_PRODUCT_QUERY, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
});


app.listen(4000, () => {
    console.log("Product server listening on port 4000")
});

//config app

//