var express = require('express');
var router = express.Router();
var mine = require('../controllers/mine');

router.get('/', (req, res, next) => {
  mine();
  res.status(200).send();
})

module.exports = router;
