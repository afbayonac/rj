import {Router, Handler, Request} from 'express'
import {verifyToken} from '../lib/jwt'

export const  middlewareJwt = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    req.decoded = {role : 'guest', username: 'guest'}
      return  next()
  }
  verifyToken(token.split(' ')[1], (err, decode) => {
    if (err) {
      return res.status(401).json({
        status: 'Access Denied',
        success: false,
        message: 'TOKEN expired or invalid'
      })
    }
    req.decoded = decode
    next()
  })
}
