import {stdResToken} from '../lib/jwt'
import {Passport} from 'passport'
import {Strategy as facebookStrategy} from 'passport-facebook'
import {cfg} from '../cfg/cfg'
import {User} from '../models/user'
import {IUser} from '../models/IUser'
import {profileFields} from '../lib/permisosFacebook'

export const authOwn = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({'mess': 'bad Request'})
  }
  User
    .findOne({username: req.body.username})
    .exec((err, user: IUser) => {
      if (err) {
        return  res.status(500).json({'mess': 'server error'})
      }
      if (!user) {
        return res.status(200).json({'mess': 'user not  found'})
      }
      if (!user.active) {
       return res.status(200).json({'mess': 'user not  actived'})
      }
      if (user.contrastPasword(req.body.password)) {
        return res.status(200).json(stdResToken(user))
      } else {
        return res.status(200).json({'mess': 'password not match'})
      }
  })
}

export const passport = new Passport()

passport.use(new facebookStrategy({
  clientID: cfg.facebook.key,
	clientSecret: cfg.facebook.secret,
	callbackURL: '/auth/facebook/callback',
  enableProof: true,
  profileFields: profileFields
}, (accessToken, refreshToken, profile, cb) => {
  User.findOne({facebookId: profile.id}).exec((err, user: IUser) => {
    if (err) {
      throw(err)
    }
    if (user) {
      return cb(null, stdResToken(user))
    }

    let newUser = new User({
      facebookId: profile.id,
      role: 'user',
      profileImgUrl: profile._json.picture.data.url,
      // confirma si existe un Array para aplicar la funcion map
      emails: profile.emails ? profile.emails.map((email) =>  Object({email: email.value, active: true })) : null
    })

    if (profile._json.location) {
      let location = profile._json.location.name.toLowerCase().split(', ')
      newUser.city = location[0]
      newUser.province = location[1]
    }
    newUser.name = [
      `${profile.name.givenName ? profile.name.givenName : ''} `,
      `${profile.name.middleName ? profile.name.middleName : ''} `,
      `${profile.name.familyName ? profile.name.familyName : ''}`
    ].join()

    newUser.save((err, user) => {
      if (err) {
        cb(err)
      }
      // only send token to passportFacebookJWT
      cb(null,stdResToken(user))
    })
  })
}))

export const passportFacebookJWT = (req, res, next) => {
  // the req.user contain stanadad response Token
  return  res.status(200).json(req.user)
}
