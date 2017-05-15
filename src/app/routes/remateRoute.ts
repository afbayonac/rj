import {Router} from 'express'
import {
  createRemate,
  updateRemate,
  readRemate,
  readRemateById
} from '../controllers/remate'

export const remateRouter = Router()

// create new remate
remateRouter.post('/', createRemate)

// update remate
remateRouter.post('/:idremates', updateRemate)

// read remates lista los remates
remateRouter.get('/', readRemate)

// read remate By Id
remateRouter.get('/:idremates', readRemateById)
