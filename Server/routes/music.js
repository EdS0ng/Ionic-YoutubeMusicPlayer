'use strict';

var express = require('express');
var router = express.Router();
var stream = require('../util/stream');

router.get('/:id', function (req, res){
  stream(req.params.id, res);
})

module.exports = router;

