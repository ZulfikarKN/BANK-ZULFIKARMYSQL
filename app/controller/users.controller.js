const User = require('../model/users.js');
const jwt = require('jsonwebtoken');

exports.logIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.logIn(email, password, (err, data) => {
        if (err) {
            res.send(err);
        }
        if (data.length < 1) {
            res.send({message: "user not found!"})
        }
        jwt.sign({data}, 'secret', (err, token) => {
            res.json({token});
        });
    });
}