import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {Remate} from '../../app/models/remate'
import {encodeToken} from '../../app/lib/jwt'

import {expect} from 'chai'
import * as supertest from 'supertest'
import {fkUser, fkRemate} from '../fakers'
import {connect, disconnect, Types} from 'mongoose'

const db = cfg.mongodb
describe('read user by id api', function () {
  let api = supertest.agent(cfg.domain)
  let users = Array.from({length: 2}, (v, k) => fkUser('user'))

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`, done)
  })

  before(function (done) {
    User.remove({}).then(done()).catch(done)
  })

  before(function (done) {
    User
    .create(users)
    .then(done())
    .catch(done)
  })

  it('read user', function (done) {
    api
    .get(`/users/${users[1]._id}`)
    .set('Authorization', `Bearer ${encodeToken(users[1])}`)
    .expect(200)
    .then((res) => {
      let user = res.body
      expect(user).to.exist
      expect(user.cred).to.not.exist
      expect(user.name).to.be.equal(users[1].name)
      expect(user.dateBorn).to.be.eql(users[1].dateBorn.toISOString())
      expect(user.province).to.be.equal(users[1].province)
      expect(user.city).to.be.equal(users[1].city)
      expect(user.gender).to.be.equal(users[1].gender)
      expect(user.location).to.be.eql(users[1].location)
      expect(user.role).to.be.equal('user')
      expect(user.active).to.be.equal(true)
      done()
    })
    .catch(done)
  })

  it('fail read user', function (done) {
    api
    .get(`/users/${users[1]._id}`)
    .set('Authorization', `Bearer ${encodeToken(users[0])}`)
    .expect(403,{
      status: 'Access Denied',
      success: false,
      message: 'Forbidden'
    }, done)
  })

  after(function (done) {
    disconnect().then(done).catch(done)
  })
})
