var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.post('/login', function(req, res) {

  if (req.body.username === config.username && req.body.password === config.password ) {
    var token = jwt.sign({ id: req.body.username }, config.secret, {
      expiresIn: 900 // expires in 15 minutes
    });
  
    res.status(200).send({ auth: true, token: token });
  } else {
    res.status(401).send({ auth: false, token: null });
  }

});

router.post('/increment', VerifyToken, function(req, res, next) {
    var increment = req.body.count * 2;
    var count = 1 > increment ? 1: increment;
    res.status(200).send({count: count});
});

router.put('/increment', VerifyToken, function(req, res, next) {
  var increment = req.body.count * 2;
  var count = 1 > increment ? 1: increment;
  res.status(200).send({count: count});
});

module.exports = router;