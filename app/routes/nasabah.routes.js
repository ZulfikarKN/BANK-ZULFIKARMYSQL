const nasabah = require("../controller/nasabah.controller.js");
var express = require('express');
var router = express.Router();

router.get('/', verifyToken, nasabah.findAll);

router.post('/', verifyToken, nasabah.create);

router.delete('/', verifyToken, nasabah.delete);

router.patch('/', verifyToken, nasabah.update);

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

module.exports = router;