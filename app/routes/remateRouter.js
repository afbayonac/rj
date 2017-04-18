const remateRouter = require('express').Router()
const remate = require('../controllers/remate')

remateRouter.get('/', remate.list)
remateRouter.post('', remate.create)
remateRouter.get('/:id', remate.getByID)
remateRouter.post('/:id', remate.update)

module.exports = remateRouter
