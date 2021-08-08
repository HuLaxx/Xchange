const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define Schema
const userSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

// compile schema to model
module.exports = mongoose.model('user', userSchema, 'users');