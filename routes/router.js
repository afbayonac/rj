var express = require('express');
var router = express.Router();
var authenticate = require('../controllers/authentication.js')

/* autenticate Route */
router.post('/login', authenticate );


module.exports = router;
