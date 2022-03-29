const nasabah = require("../controller/nasabah.controller.js");
var express = require('express');
var router = express.Router();

router.get('/', nasabah.findAll);

router.post('/', nasabah.create);

router.delete('/', nasabah.delete);

router.patch('/', nasabah.update);

module.exports = router;