import {encodeToken} from '../lib/jwt'
import {Passport} from 'passport'
import {Strategy as facebookStrategy} from 'passport-facebook'
import {cfg} from '../cfg/cfg'
import {User} from '../models/user'
import {IUser} from '../models/IUser'

export const authOwn = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({'mess': 'Bad Request'})
  }
  User
    .findOne({username: req.body.username})
    .exec((err, user: IUser) => {
      if (err) {
        return  res.status(500).json({'mess': 'server error'})
      }
      if (!user) {
        return res.status(200).json({'mess': 'no user find'})
      }

      if (user.contrastPasword(req.body.password)) {
        return res.status(200).json({
          access_token: encodeToken(user),
          token_type: 'Bearer',
          expired_in: 3600
        })
      } else {
        return res.status(200).json({'mess': 'contraseñas no considen'})
      }
  })
}

export const passport = new Passport()

let profileFields =  [
  'email',
  'location',
  'id',
  'cover',
  'name',
  'age_range',
  'link',
  'gender',
  'locale',
  'picture',
  'timezone',
  'updated_time',
  'verified'
]

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
      return cb(null, encodeToken(user))
    }

    let newUser = new User({facebookId: profile.id, role: 'client'})

    if (profile.emails) {
      profile.emails.map((email) => {
        newUser.emails.push({email: email.value, active: true})
      })
    }
    if (profile._json.location) {
      let location = profile._json.location.name.toLowerCase().split(', ')
      newUser.city = location[0]
      newUser.province = location[1]
    }
    if (!profile._json.picture.data.is_silhouette) {
      newUser.profileImgUrl = profile._json.picture.data.url
    }
    newUser.name = [
      `${profile.name.givenName ? profile.name.givenName : ''} `,
      `${profile.name.middleName ? profile.name.middleName : ''} `,
      `${profile.name.familyName ? profile.name.familyName : ''}`
    ].join()

    newUser.save((err, user) => {
      if (err) {
        throw(err)
      }
      // only send token to passportFacebookJWT
      cb(null,encodeToken(user))
    })
  })
}))

export const passportFacebookJWT = (req, res, next) => {
  console.log(req.user)
  return  res.status(200).json({
    access_token: req.user,
    token_type: 'Bearer',
    expired_in: 3600
  })
}
