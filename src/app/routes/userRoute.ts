import {Router} from 'express'
import {createUser, verifyEmail, updateUser} from '../controllers/user'

export const userRouter = Router()

// create new user
userRouter.post('/', createUser)

// verify email
userRouter.get('/verify', verifyEmail)

// update user
userRouter.post('/:idusers', updateUser)
