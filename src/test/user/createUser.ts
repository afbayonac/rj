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
      expect(res.body).to.have.all.keys('access_token', 'token_type', 'expired_in')
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
      expect(res.status).to.be.equal(400,'status expect 200')
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
      expect(userDB.name).to.be.equal(fkUser.name)
      expect(userDB.dateBorn.toString()).to.be.equal(fkUser.dateBorn.toString())
      expect(userDB.role).to.be.equal('user')
      expect(userDB.emails[0].active).to.be.equal(false)
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
