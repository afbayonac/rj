import * as accesslist from 'acl'
import {aclist} from '../cfg/acl'

const acl = new accesslist(new accesslist.memoryBackend())
acl.allow(aclist)

acl.addUserRoles('guest',['guest'])
acl.addUserRoles('admin',['admin'])
acl.addUserRoles('user',['user'])

export const middlewareAcl = (req, res, next) => {
  // TODO buscar la mejor manera de separar el path de la query
  acl.isAllowed(req.decoded.role, req.url.split('?')[0], req.method, (err, isAllowed) => {
    if (isAllowed) {
      return next()
    } else {
      return res.status(403).json({
        status: 'Access Denied',
        success: false,
        message: 'REQUIRED: Role not found'
      })
    }
  })
}
