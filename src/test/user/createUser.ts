import 'mocha'
import {expect} from 'chai'
import {User} from '../../app/models/user'
import {cfg} from '../../app/cfg/cfg'
import * as supertest from 'supertest'
import {connect, disconnect} from 'mongoose'
import {fkUser} from '../fakers'

const db = cfg.mongodb
describe('create User API', function () {
  let api = supertest.agent(cfg.domain)
  let code = ''
  let id = ''

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      User.remove({}).exec(done)
    }, done)
  })

  it('create user', function (done) {
    api
    .post('/users')
    .send(fkUser)
    .end(function (err, res) {
      if (err) {
        done(err)
      }
      expect(res.status).to.be.equal(200,'status expect 200')
      expect(res.body.mess).to.be.equal('user created')
      done()
    })
  })

  it('fail create user', function (done) {
    api
    .post('/users')
    .send(fkUser)
    .end(function (err, res) {
      if (err) {
        done(err)
      }
      expect(res.status).to.be.equal(400,'status expect 400')
      expect(res.body).to.have.all.keys('mess')
      done()
    })
  })

  it('contrast database new User', function (done) {
    User.findOne({'emails.email': fkUser.emails[0].email}, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done('user no found')
      }
      // antes de las prebas para guardar variables para los siguientes tests
      id = user.emails[0].verify[0]._id
      code = user.emails[0].verify[0].code
      expect(user.name).to.be.equal(fkUser.name)
      expect(user.dateBorn.toString()).to.be.equal(fkUser.dateBorn.toString())
      // se espera que todos los usuarios creados tengan el role de user
      expect(user.role).to.be.equal('user')
      expect(user.emails[0].active).to.be.equal(false)
      expect(user.emails[0].verify[0].expiration).to.be.instanceOf(Date)
      expect(user.emails[0].verify[0].code).to.be.a('string')
      expect(user.active).to.be.equal(false)
      done()
    })
  })

  it('verify email', function (done) {
    api
    .get(`/users/verify?id=${id}&&code=${code}`)
    .end(function (err, res) {
      if (err) {
        done(err)
      }
      expect(res.status).to.be.equal(200,'status expect 200')
      expect(res.body).to.have.all.keys('mess')
      done()
    })
  })

  it('contrast database user verified', function (done) {
    User.findOne({'emails.email': fkUser.emails[0].email}, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done('user no found')
      }
      expect(user.role).to.be.equal('user')
      expect(user.active).to.be.equal(true)
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
