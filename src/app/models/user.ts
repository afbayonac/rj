import {Document, Schema, Model, model} from 'mongoose'
import {IUser} from './IUser'
import {createHmac, randomBytes } from 'crypto'

export interface IUserModel extends IUser, Document {
  encryptPassword (password: string, salt: string): string
  getRandomSalt (password: string, salt: string): string
}

export const UserSchema: Schema = new Schema({
  name: String,
  username: String,
  number: {type: String, unique: true},
  profileImgUrl: String,
  facebookId: {type: String, unique: true},
  emails: [{
    email: {type: String , unique : true},
    active: {type: Boolean, default: false}
  }],
  gender: String,
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  location: {
      type: {type: String},
      coordinates: [Number]
  },
  cred: {
    password: String,
    salt: String
  },
  dateBorn: Date
})

let encryptPassword = (password: string, salt: string): string => {
  return createHmac('sha512', salt).update(password).digest('hex')
}
let getRandomSalt = (length: number) : string => {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
}

UserSchema.methods.contrastPasword = function (password: string) {
  return encryptPassword(password, this.cred.salt) === this.cred.password
}

UserSchema.pre('save',function (next) {
  if (!this.isModified('cred.password')) {return next()}
  this.cred.salt = getRandomSalt(16)
  this.cred.password = encryptPassword(this.cred.password, this.cred.salt)
  next()
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)

export default User
