import {User} from '../models/user'
import {stdResToken} from '../lib/jwt'
import {IUser} from '../models/IUser'
import {Types} from 'mongoose'
import {Mailman} from '../lib/mail'
const mail = new Mailman()

export const createUser = (req, res, next) => {
  let newUser: IUser = req.body

  if (!newUser.username
     || !newUser.emails
     || !newUser.emails[0]
     || !newUser.cred.password
   ) {
    return res.status(400).json({'mess': 'bad request'})
  }
  User.findOne({ $or: [
    {username: newUser.username},
    {emails: newUser.emails[0]}
  ]}).then((user) => {
      if (user) {
        return res.status(400).json({'mess': 'username or email registered'})
      }
      new User({
        name: newUser.name,
        username: newUser.username,
        number: newUser.number,
        emails: newUser.emails.map((e) => {
          return {
            email: e.email,
            active: false,
            verify: [mail.sendVerifyEmail(e.email, newUser.username)]
          }
        }),
        gender: newUser.gender,
        city: newUser.city,
        dateBorn: newUser.dateBorn,
        province: newUser.province,
        location: newUser.locations,
        cred: {
          password: newUser.cred.password
        }
      })
      .save(function (err, user) {
        if (err) {
          return  res.status(500).json({'mess': 'server error'})
        }
        if (user) {
          return  res.status(200).json({mess: 'user created'})
        }
      }
      )
    }, (err) => {
      return  res.status(500).json({'mess': 'server error'})
    }
  )
}

export const verifyEmail = (req, res, next) => {
  let id = req.query.id
  let code = req.query.code
  User.findOne({'emails.verify._id':  Types.ObjectId(id) })
  .then((user) => {
    if (!user) {
      return res.status(400).json({'mess': 'user no found'})
    }
    user.emails.find( (email) => {
      let v = email.verify.find((v) => {
        return v._id.equals(Types.ObjectId(id))
      })
      if (v.expiration < new Date() ) {
        return res.status(400).json({'mess': 'code expired'})
      }
      if (v.code !== code ) {
        return res.status(400).json({'mess': 'code not match'})
      }
      email.active = true
      return true
    })
    user.active = true
    user.save((err) => {
      if (err) {
        return  res.status(500).json({'mess': 'server error'})
      }
      return res.status(200).json({'mess': 'user actived'})
    })
  },(err) => {
    return  res.status(500).json({'mess': 'server error'})
  })
}
