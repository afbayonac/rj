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

// stanadar request Token
export const stdResToken = (payload: IUser | IPayload) => {
  return {
    access_token: encodeToken(payload),
    token_type: 'Bearer',
    expired_in: 3600
  }
}

export const decodeToken = (token: string) => {
  return decode(token, {complete: true})
}

/**
 * @callback requestCallback
 * @param {Error} error - null fail veryfy
 * @param {object} decode
 * @function verifyToken - verifica el token
 * @param {requestCallback} cb - The callback that handles the response.
 */
export const verifyToken = (token: string, cb: Function) => {
    return verify(token, cfg.jwtSecret, cb)
}

export const refreshToken = (token: string, cb: Function) => {
    verifyToken(token, (err, decode) => {
      if (err) {
        cb(err)
      }
      cb(null, encodeToken(decode) )
    }
  )
}
