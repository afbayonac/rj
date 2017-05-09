import {sign, decode, verify} from 'jsonwebtoken'
import {IUser} from '../models/IUser'
import {cfg} from '../cfg/cfg'

export interface IPayload {
  role: string
  username: string
}

// cofifica el token
export const encodeToken = (payload: IUser | IPayload): string => {
  return sign({
      username : payload.username,
      role: payload.role
  }, cfg.jwtSecret, {expiresIn: 60 * 60})
}

// decodifica el token
export const decodeToken = (token: string) => {
  return decode(token, {complete: true})
}

// retorna stanadar request Token https://tools.ietf.org/html/rfc6750#section-4
export const stdResToken = (payload: IUser | IPayload) => {
  return {
    access_token: encodeToken(payload),
    token_type: 'Bearer',
    expired_in: 3600
  }
}

// verifica el token async
export const verifyToken = (token: string, cb: Function) => {
    return verify(token, cfg.jwtSecret, cb)
}

// verifica el token async
export const refreshToken = (token: string, cb: Function) => {
    verifyToken(token, (err, decode) => {
      if (err) {
        cb(err)
      }
      cb(null, encodeToken(decode) )
    }
  )
}
