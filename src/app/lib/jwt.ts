import {sign, decode, verify} from 'jsonwebtoken'
import {IUser} from '../models/IUser'
import {cfg} from '../cfg/cfg'

export interface IPayload {
  role: string
  username: string
}

export const encodeToken = (payload: IUser | IPayload): string => {
  return sign({
      username : payload.username,
      role: payload.role
  }, cfg.jwtSecret, {expiresIn: 60 * 60})
}

export const decodeToken = (token: string) => {
  return decode(token, {complete: true})
}

export const verifyToken = (token: string, cb: Function) => {
    return verify(token, cfg.jwtSecret, cb)
}

export const refreshToken = (token: string): string => {
    let decode = decodeToken(token)
    return encodeToken(decode.payload)
}
