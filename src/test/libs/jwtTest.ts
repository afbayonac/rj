import 'mocha'
import {IUser} from '../../app/models/IUser'
import {expect, should, assert} from 'chai'
import * as faker from 'faker'
import {cfg} from '../../app/cfg/cfg'

import {
  IPayload,
  encodeToken,
  decodeToken,
  refreshToken,
  verifyToken,
  stdResToken
} from '../../app/lib/jwt'

describe('json web tokens Lib', function () {
  let user: IUser = {
    name: faker.name.firstName(),
    username: faker.name.lastName(),
    number: faker.phone.phoneNumber(),
    profileImgUrl: faker.image.imageUrl(),
    emails: [{email: faker.internet.email(), active: faker.random.boolean()}],
    role:  'user',
    cred: {
      password: faker.internet.password()
    }
  }
  let token = ''

  it('encodeToken()', function (done) {
    token = encodeToken(user)
    expect(token)
    .to
    .match(/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/)
    done()
  })

  it('dencodeToken()', function (done) {
    let decode = decodeToken(token)
    expect(decode).to.have.all.keys('header', 'payload', 'signature')
    expect(decode.payload).to.not.have.any.keys('cred', 'emails', 'name')
    done()
  })

  it('refreshToken()', function (done) {
    // el test se encarda de refrescar el test despues de un segundo para que
    // que el token cambie
    setTimeout( function () {
    refreshToken(token, (err, refreshToken) => {
      expect(err).to.be.equal(null)
      expect(refreshToken)
      .to
      .match(/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/)
      expect(refreshToken).to.be.not.equal(token)
      done()
    })}, 1000)
  })

  it('verifyToken()', function (done) {
    verifyToken(token,(err, decode) => {
      if (err) {
        return done('token verify fail')
      }
      expect(decode).to.have.all.keys('exp', 'iat', 'role', 'username')
      done()
    })
  })

  it('stanadard response Toker', function (done) {
    let stanadard = stdResToken(user)
    expect(stanadard).to.have.all.keys('access_token', 'token_type', 'expired_in')
    done()
  })

})
