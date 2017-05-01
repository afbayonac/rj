import {Router} from 'express'
import {middlewareJwt} from '../lib/middlewareJwt'
import {middlewareAcl} from '../lib/middlewareAcl'
import {authRouter} from './authRouter'

export const router = Router()

// Authenticate Middleware
router.use(middlewareJwt)

// Authorization middleware
router.use(middlewareAcl)

// AuthRouter
router.use(authRouter)
