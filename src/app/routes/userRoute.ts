import {Router} from 'express'
import {createUser, verifyEmail} from '../controllers/user'

export const userRouter = Router()

userRouter.post('/', createUser)

userRouter.get('/verify', verifyEmail)
