// the path of reques have the format
// /resource1/:idresource1/resource2/:idresource2?query1=reques1...

import * as url from 'url'
import {Types} from 'mongoose'
import {IPayload} from './jwt'
import * as accesslist from 'acl'
import {aclist, rlcByUserId} from '../cfg/acl'

const acl = new accesslist(new accesslist.memoryBackend())
acl.allow(aclist)

acl.addUserRoles('guest',['guest'])
acl.addUserRoles('admin',['admin'])
acl.addUserRoles('user',['user'])
acl.addUserRoles('scraper',['scraper'])
acl.addRoleParents('scraper',['user'])
acl.addRoleParents('admin',['scraper','guest'])

const re = /^[0-9a-fA-F]{24}$/

const checkRoleId = (decode: IPayload, resource, method: string, rlc) => {
  // esta funcion se basa totalmente en acl
  // hacer una validacion dinamica de el usurio
  // retorna true si no existe regla
  // retorna true el id sea igual parametro
  // retorna false si id no es igual al parametro
  let role = decode.role
  let url = resource.url
  let idParam = resource[':idusers']
  let id = decode._id
  return (
    rlc
    .filter((el) => el.roles && el.roles.includes('scraper'))
    .map((el) => el.deny )
    .reduce((pre, pos) => pre.concat(pos), [])
    .filter((el) => el.resources === url && el.restrict.includes(method))
    .some((el) => el)
  ) ? idParam === id : true
}

const parceUrl = (path: string): any => {
  // parceUrl mapea los objectId y los remplasa por :id<resource>
  // guarda los ObjectId y retorna un objeto con la url y los ObjectIds
  let reParams = /^[0-9a-fA-F]{24}$/

  return url
    .parse(path)
    .pathname
    .split('/')
    .slice(1)
    .reduce((pre, act, i, A) => {
      if (i > 0 && reParams.test(act) && Types.ObjectId.isValid(act) ) {
        pre.url = `${pre.url}/:id${A[i - 1]}`
        pre[`:id${A[i - 1]}`] = act
        return pre
      }
      pre.url = pre.url ? `${pre.url}/${act}` : `/${act}`
      return pre
    }, { url: ''})
}

export const middlewareAcl = (req, res, next) => {
  let resource = parceUrl(req.url)
  let decode = req.decoded
  let method = req.method
  let url = resource.url

  acl.isAllowed(decode.role, url, method, (err, isAllowed) => {
    // validaciones adicionales
    if (isAllowed && checkRoleId(decode, resource, method, rlcByUserId)) {
        return next()
    }
    return res.status(403).json({
      status: 'Access Denied',
      success: false,
      message: 'Forbidden'
    })
  })
}
