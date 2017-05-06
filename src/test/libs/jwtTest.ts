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
  verifyToken
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
    let decode = decodeToken(token)
    setTimeout(() => {
      let refreshtoken = refreshToken(token)
      done()
    }, 1000)
  })

  it('refreshToken()', function (done) {
    verifyToken(token,(err, decode) => {
      if (err) {
        return done('token verify fail')
      }
      expect(decode).to.be.a('object')
      done()
    })
  })

})
