import {User} from '../models/user'
import {stdResToken} from '../lib/jwt'
import {IUser} from '../models/IUser'

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
  ]}).then(
    function (user) {
      if (user) {
        res.status(400).json({'mess': 'username or email registered'})
      }
      new User({
        name: newUser.name,
        username: newUser.username,
        number: newUser.number,
        emails: newUser.emails.map((e) => {return {email: e.email}}),
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
          return  res.status(200).json(stdResToken(user))
        }
      }
      )
    },
    function (err) {
      return  res.status(500).json({'mess': 'server error'})
    }
  )
}
