const user = require("../controller/users.controller.js");
var express = require('express');
var router = express.Router();

router.post('/login', user.logIn);
router.get('/login', (req, res) => {
    res.send({message: "post your email and password!"});
})

module.exports = router;