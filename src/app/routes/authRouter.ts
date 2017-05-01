import {Router} from 'express'
import {authOwn, passport, passportFacebookJWT} from  '../controllers/auth'
import {permisosFacebook} from '../lib/permisosFacebook'
export const authRouter = Router()

authRouter.post('/auth', authOwn)
authRouter.get('/auth/facebook', passport.authenticate('facebook', {
  scope: permisosFacebook()
}))

authRouter.get('/auth/facebook/callback', passport.authenticate('facebook',  {
    session: false
}), passportFacebookJWT)
