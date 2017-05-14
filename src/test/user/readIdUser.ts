import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {Remate} from '../../app/models/remate'
import {encodeToken} from '../../app/lib/jwt'

import {expect} from 'chai'
import * as supertest from 'supertest'
import {fkUser, fkRemate} from '../fakers'
import {connect, disconnect, Types} from 'mongoose'

const db = cfg.mongodb
describe('read user api', function () {
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
    .get(`/users/${users[0]._id}`)
    .set('Authorization', `Bearer ${encodeToken(users[0])}`)
    .expect(200)
    .then((res) => {
      expect(res).to.exist
      expect(res.name).to.be.equal(users[1].name)
      expect(res.dateBorn).to.be.eql(users[1].dateBorn)
      expect(res.province).to.be.equal(users[1].province)
      expect(res.city).to.be.equal(users[1].city)
      expect(res.gender).to.be.equal(users[1].gender)
      expect(res.location).to.be.eql(users[1].location)
      expect(res.role).to.be.equal('user')
      expect(res.active).to.be.equal(true)
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
