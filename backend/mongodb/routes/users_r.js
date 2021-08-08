const express = require('express');
const router = express.Router();
const UserList = require('../../models/user');

router.get('/', (req, res) => {
    try {
        const users = await UserList.find();
        res.json(users);
    } catch (err) {
        res.json({ usersShowingError: err });
    }
});


router.post('/', (req, res) => {
    const users = new UserList({
        firstName: req.body.name,
        lastName: req.body.lastName,
        Username: req.body.naUsernameme,
        Password: req.body.Password
    });

    try {
        const CreateUser = await book.save();
        res.json(CreateUser);
    } catch (err) {
        res.json({ ErrorMessage: err });
    }

});

router.post('/:id', (req, res) => {

});
module.exports = router;