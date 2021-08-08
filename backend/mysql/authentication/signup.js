const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const Path = require('path')
const router = express.Router();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
})

router.post('/signup', (res, req) => {

    const name = req.body.name;
    const username = req.body.username;

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    

    const INSER_USERNAME = 'INSERT INTO users(username,password) VALUES(?,?)';
    connection.query(INSER_USERNAME, [username, password], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (name && username && email && password && confirmPassword) {
                if (password == confirmPassword) {
                    
                } else {
                    return res.send("confirmPassword and password should same");
                }
            }
        }
    })
})

export default router;