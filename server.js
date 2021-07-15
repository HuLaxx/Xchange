// import lib
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const Q_SELECT_ALL_PRODUCT_QUERY = 'Select * From users';
const Q_INSERT_NEWUSER = 'Insert into Users(username,password) Values(?,?)';
const Q_SELECT_USERNAME = 'SELECT * FROM users WHERE username=?';
const Q_INSERT_NEWITEM = 'Insert into item(productName,Author,requirement,) Values(?,?,?)';

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
    const Email = req.body.Email;

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

//Uploading Item in Database name
app.get('/Xc/uploadItem', (req, res) => {
    const ProductImage = req.body.Image;
    const ProductName = req.body.productName;

    const Author = req.body.author;
    const requirement = req.body.requirement;
    connection.query(Q_INSERT_NEWITEM, [ProductImage, ProductName, Author, requirement], (err, result) => {
        if (err) {
            return res.send({ Error: err });
        } else {
            return res.send("SuccessfullyAdded");
        }
    })
})

app.post('/Xc/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query(Q_SELECT_USERNAME, username, (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (res.length > 0) {
            console.log(res);
            return res.send(result);

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