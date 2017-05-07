import 'mocha'
import {expect} from 'chai'
import {User} from '../../app/models/user'
import {cfg} from '../../app/cfg/cfg'
import * as supertest from 'supertest'
import {connect, disconnect} from 'mongoose'
import * as faker from 'faker'

const db = cfg.mongodb
describe('create User API', function () {
  let api = supertest.agent(cfg.domain)
  let user = {
    name: `${faker.name.firstName()}  ${faker.name.lastName()}`,
    username: faker.name.title(),
    city: faker.address.city(),
    province: faker.address.city(),
    locations: {
      type: 'Point',
      coordinates: [faker.address.longitude(), faker.address.latitude()]
    },
    dateBorn: faker.date.past(16),
    cred: {
      password: faker.hacker.phrase()
    },
    emails: [
      {
        email: faker.internet.email()
      }
    ]
  }
  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      User.remove({}).exec(done)
    }, done)
  })

  it('create user', function (done) {
    api
    .post('/users')
    .send(user)
    .end(function (err, res) {
      if (err) {
        done(err)
      }
      expect(res.status).to.be.equal(200,'status expect 200')
      expect(res.body).to.have.all.keys('access_token', 'token_type', 'expired_in')
      done()
    })
  })

  it('contrast database', function (done) {
    User.findOne({'emails.email': user.emails[0].email}, function (err, userDB) {
      if (err) {
        return done(err)
      }
      if (!userDB) {
        return done('user no found')
      }
      expect(userDB.name).to.be.equal(user.name)
      expect(userDB.dateBorn.toString()).to.be.equal(user.dateBorn.toString())
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
