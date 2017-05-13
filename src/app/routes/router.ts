import {Router} from 'express'
import {middlewareJwt} from '../lib/middlewareJwt'
import {middlewareAcl} from '../lib/middlewareAcl'
import {authRouter} from './authRouter'
import {userRouter} from './userRoute'
import {remateRouter} from './remateRoute'
export const router = Router()

// Authenticate Middleware
router.use(middlewareJwt)

// Authorization middleware
router.use(middlewareAcl)

// AuthRouter
router.use('/auth', authRouter)

// userRouter
router.use('/users', userRouter)

// remateRouter
router.use('/remates', remateRouter)
