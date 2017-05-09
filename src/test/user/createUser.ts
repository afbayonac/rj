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
  let emailId = ''

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

  it('contrast database', function (done) {
    User.findOne({'emails.email': fkUser.emails[0].email}, function (err, userDB) {
      if (err) {
        return done(err)
      }
      if (!userDB) {
        return done('user no found')
      }
      // antes de las prebas para guardar variables para los siguientes tests
      console.log(userDB.emails[0].verify)
      emailId = userDB.emails[0]._id
      code = userDB.emails[0].verify[0].code

      expect(userDB.name).to.be.equal(fkUser.name)
      expect(userDB.dateBorn.toString()).to.be.equal(fkUser.dateBorn.toString())
      // se espera que todos los usuarios creados tengan el role de user
      expect(userDB.role).to.be.equal('user')
      expect(userDB.emails[0].active).to.be.equal(false)
      expect(userDB.emails[0].verify[0].expiration).to.be.instanceOf(Date)
      expect(userDB.emails[0].verify[0].code).to.be.a('string')
      expect(userDB.active).to.be.equal(false)
      done()
    })
  })

  it('verify email', function (done) {
    api
    .get(`/users/verify?email=${emailId}&&code=${code}`)
    .end(function (err, res) {
      if (err) {
        done(err)
      }
      expect(res.status).to.be.equal(200,'status expect 200')
      expect(res.body).to.have.all.keys('mess')
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
