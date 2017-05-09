import {Router} from 'express'
import {createUser, verifyEmail} from '../controllers/user'

export const userRouter = Router()

// create new user
userRouter.post('/', createUser)

// verify email
userRouter.get('/verify', verifyEmail)
