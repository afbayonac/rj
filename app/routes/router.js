var router = require('express').Router()
var authenticate = require('../controllers/authentication')
var start = require('./mine')
const remateRouter = require('./remateRouter')

/* autenticate Route */
router.post('/login', authenticate)
router.use('/mine', start)
// remates router
router.use('/remates', remateRouter)

module.exports = router
