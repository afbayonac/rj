import {fkUser} from '../fakers'
import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'

import {expect, assert} from 'chai'
import * as supertest from 'supertest'
import {connect, disconnect} from 'mongoose'

const db = cfg.mongodb

describe('authOwn', function () {
  let api = supertest.agent(cfg.domain)
  let token = ''
  let user = fkUser()

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      User.remove({}).exec(done)
    }, done)
  })

  before(function (done) {
    new User(user).save(done())
  })

  it('authOwn API', function (done) {
    api
    .post('/auth')
    .type('form')
    .send({
      username: user.username,
      password: user.cred.password
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        done(err)
      }
      assert.equal(res.body.token_type, 'Bearer', 'Fail type token')
      expect(res.body.expired_in).to.be.a('number')
      expect(res.body.access_token).to.be.a('string')
      expect(res.body.access_token).to
      .match(/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/)
      token = res.body.access_token
      done()
    })
  })

  it ('request with token', function (done) {
    api
    .get('/')
    .set('Authorization', `Bearer ${token}`)
    .expect(404,done)
  })

  it ('request without token', function (done) {
    api
    .get('/')
    .expect(403,done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
