const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const Book = require('./routes/users_r');
app.use(express.json());
const Database = "mongodb://127.0.0.1:27017/Test"
app.get('/', (req, res) => {
    res.send("Server is online");
});

app.use('/book', Book);
mongoose.connect(Database, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.Port || 5000;
app.listen(port, () => {
    console.log("Product server listening on port :", { port })
});