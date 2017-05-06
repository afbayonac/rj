import {Router} from 'express'
import {authOwn, passport, passportFacebookJWT} from  '../controllers/auth'
import {permisosFacebook} from '../lib/permisosFacebook'
export const authRouter = Router()

authRouter.post('/', authOwn)

authRouter.get('/facebook', passport.authenticate('facebook', {
  scope: permisosFacebook()
}))

authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    session: false
}), passportFacebookJWT)
