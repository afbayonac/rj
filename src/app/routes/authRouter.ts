import {Router} from 'express'
import {authOwn, passport, passportFacebookJWT} from  '../controllers/auth'
import {permisosFacebook} from '../lib/permisosFacebook'
export const authRouter = Router()

// autenticacion de usuarios del sistam
authRouter.post('/', authOwn)

// autehnticacion de usuarios utilizando facebook
authRouter.get('/facebook', passport.authenticate('facebook', {
  scope: permisosFacebook()
}))

// call back a la authentificacion de facebook
authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    session: false
}), passportFacebookJWT)
