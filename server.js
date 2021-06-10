// import lib
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCT_QUERY = 'Select * From users';
const INSERT_NEWUSER_QUERY = 'Insert into Users(Username,Password,ProfilePicture) Values(?,?,?)';

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


app.post('/Api/newUser', (req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;

    connection.query(INSERT_NEWUSER_QUERY, [Username, Password], (err, value) => {

    })
})
app.get('/', (req, res) => {
    res.send('go to /product to seee products');
})

app.get('/product/add', (req, res) => {
    const { username, password } = req.query;
    const INSER_USERNAME = 'INSERT INTO users(username,password) VALUES(?,?)';
    connection.query(INSER_USERNAME, [username, password], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Succesfully added");
        }
    })
})

app.get('/Product', (req, res) => {
    connection.query(SELECT_ALL_PRODUCT_QUERY, (err, result) => {
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