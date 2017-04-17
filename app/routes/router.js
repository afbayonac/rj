var router = require('express').Router()
var authenticate = require('../controllers/authentication')
var start = require('./mine')
const remate = require('./remate')

/* autenticate Route */
router.post('/login', authenticate)
router.use('/mine', start)
// remates router
router.use('/remates', remate)

module.exports = router
