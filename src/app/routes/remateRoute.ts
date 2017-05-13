import {Router} from 'express'
import {createRemate, updateRemate} from '../controllers/remate'

export const remateRouter = Router()

// create new remate
remateRouter.post('/', createRemate)

// update remate
remateRouter.post('/:idremates', updateRemate)
