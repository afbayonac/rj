import 'mocha'
import {expect, should, assert} from 'chai'
import {cfg} from '../../app/cfg/cfg'
import {fkUser} from '../fakers'

import {
  IPayload,
  encodeToken,
  decodeToken,
  refreshToken,
  verifyToken,
  stdResToken
} from '../../app/lib/jwt'

describe('json web tokens Lib', function () {
  let reToken = /[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/
  let token = ''

  it('encode Token', function (done) {
    token = encodeToken(fkUser)
    expect(token).to.match(reToken)
    done()
  })

  it('dencode Token', function (done) {
    let decode = decodeToken(token)
    expect(decode).to.have.all.keys('header', 'payload', 'signature')
    expect(decode.payload).to.not.have.any.keys('cred', 'emails', 'name')
    done()
  })

  it('refresh Token', function (done) {
    // el test se encarda de refrescar el test despues de un segundo para que
    // que el token cambie
    setTimeout( function () {
    refreshToken(token, (err, refreshToken) => {
      expect(err).to.be.equal(null)
      expect(refreshToken).to.match(reToken)
      expect(refreshToken).to.be.not.equal(token)
      done()
    })}, 1000)
  })

  it('verify Token', function (done) {
    verifyToken(token,(err, decode) => {
      if (err) {
        return done('token verify fail')
      }
      expect(decode).to.have.all.keys('exp', 'iat', 'role', 'username')
      done()
    })
  })

  it('stanadard response Toker', function (done) {
    let stanadard = stdResToken(fkUser)
    expect(stanadard).to.have.all.keys('access_token', 'token_type', 'expired_in')
    done()
  })

})
