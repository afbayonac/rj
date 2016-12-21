var express = require('express');
var router = express.Router();
var authenticate = require('../controllers/authentication');
var start = require('./mine');

/* autenticate Route */
router.post('/login', authenticate );
router.get('/start', start)

module.exports = router;
