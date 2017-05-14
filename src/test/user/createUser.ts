import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'

import {fkUser} from '../fakers'
import * as supertest from 'supertest'
import {expect, should, assert} from 'chai'
import {connect, disconnect} from 'mongoose'

const db = cfg.mongodb
describe('create User API', function () {
  let code: string
  let id: string

  let api = supertest.agent(cfg.domain)
  let user = fkUser()

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`, done)
  })

  before(function (done) {
    User.remove({}).then(done()).catch(done)
  })

  it('create user', function (done) {
    api
    .post('/users')
    .send(user)
    .expect(200, {
      mess : 'user created'
    }, done)
  })

  it('fail create user', function (done) {
    api
    .post('/users')
    .send(user)
    .expect(400,{
      mess: 'username or email registered'
    },done)
  })

  it('contrast database new User', function (done) {
    User
    .findOne({'emails.email': user.emails[0].email})
    .then((userdb) => {
        if (!userdb) {
        return done('user no found')
      }
      // antes de las prebas para guardar variables para los siguientes tests
      id = userdb.emails[0].verify[0]._id
      code = userdb.emails[0].verify[0].code
      expect(userdb.name).to.be.equal(user.name)
      expect(userdb.dateBorn.toString()).to.be.equal(user.dateBorn.toString())
      // check location
      let ldb = userdb.location
      let l = user.location
      expect(ldb.type).to.be.eql(l.type)
      expect(ldb.coordinates[0]).to.be.eql(l.coordinates[0])
      expect(ldb.coordinates[1]).to.be.eql(l.coordinates[1])
      // se espera que todos los usuarios creados tengan el role de user
      expect(userdb.role).to.be.equal('user')
      expect(userdb.emails[0].active).to.be.equal(false)
      expect(userdb.emails[0].verify[0].expiration).to.be.instanceOf(Date)
      expect(userdb.emails[0].verify[0].code).to.be.a('string')
      expect(userdb.active).to.be.equal(false)
      done()
    })
    .catch(done)
  })

  it('verify email', function (done) {
    api
    .get(`/users/verify?id=${id}&&code=${code}`)
    .expect(200,{
      mess: 'user actived'
    },done)
  })

  it('contrast database user verified', function (done) {
    User
    .findOne({'emails.email': user.emails[0].email})
    .then((user) => {
      if (!user) {
        return done('user no found')
      }
      expect(user.role).to.be.equal('user')
      expect(user.active).to.be.equal(true)
      done()
    })
    .catch(done)
  })

  after(function (done) {
    disconnect().then(done).catch(done)
  })
})
