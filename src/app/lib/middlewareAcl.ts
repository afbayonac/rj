// the path of reques have the format
// /resource1/:idresource1/resource2/:idresource2?query1=reques1...

import * as accesslist from 'acl'
import {aclist} from '../cfg/acl'
import {Types} from 'mongoose'
import * as url from 'url'
const acl = new accesslist(new accesslist.memoryBackend())
acl.allow(aclist)

acl.addUserRoles('guest',['guest'])
acl.addUserRoles('admin',['admin'])
acl.addUserRoles('user',['user'])
acl.addUserRoles('scraper',['scraper'])
acl.addRoleParents('scraper',['user'])
acl.addRoleParents('admin',['scraper','guest'])

const re = new RegExp(/^[0-9a-fA-F]{24}$/)

const checkRoleId = (decode, resource, method) => {
  // para mantener hacer una validacion dinamica de el usurio
  // para acceder a modificar un usuario especificamente
  if (decode.role === 'user' && method === 'POST' && resource.url === '/users/:idusers') {
    if (decode._id === resource[':idusers']) {
      return true
    }
    return false
  }
  return true
}

const parceUrl = (path: string): any => {
  // parce url mapea los objetos id y los remplasa por :id<resource>
  // guarda los ObjectId y retorna un objeto con la url y los ObjectIds
  return url
    .parse(path)
    .pathname
    .split('/')
    .slice(1)
    .reduce((pre, act, i, A) => {
      if (/^[0-9a-fA-F]{24}$/.test(act) && Types.ObjectId.isValid(act) && i > 0) {
        pre['url'] = `${pre['url']}/:id${A[i - 1]}`
        pre[`:id${A[i - 1]}`] = `${act}`
        return pre
      }
      pre['url'] = pre['url'] ? `${pre['url']}/${act}` : `/${act}`
      return pre
    }, {})
}

export const middlewareAcl = (req, res, next) => {
  let resource = parceUrl(req.url)
  acl.isAllowed(req.decoded.role, resource.url, req.method, (err, isAllowed) => {
    if (isAllowed ) {
      // validaciones adicionales
      if (checkRoleId(req.decoded, resource, req.method)) {
        return next()
      }
    }
    return res.status(403).json({
      status: 'Access Denied',
      success: false,
      message: 'REQUIRED: Role not found'
    })
  })
}
