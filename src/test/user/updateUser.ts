import 'mocha'
import {expect} from 'chai'
import {User} from '../../app/models/user'
import {Remate} from '../../app/models/remate'
import {encodeToken} from '../../app/lib/jwt'
import {cfg} from '../../app/cfg/cfg'
import * as supertest from 'supertest'
import {connect, disconnect, Types} from 'mongoose'
import {fkUser, fkRemate} from '../fakers'

const db = cfg.mongodb
describe('Update User API', function () {
  let api = supertest.agent(cfg.domain)
  let token: string
  let id: string
  let user = fkUser('user')
  let userUpdate = fkUser('admin')

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(done, done)
  })

  before(function (done) {
    User.remove({}).exec(done)
  })

  before(function (done) {
    new User(user)
    .save((err, userdb) => {
      if (err) {
        return done(err)
      }
      id = userdb._id
      token = encodeToken(userdb)
      done()
    })
  })

  it('update User', function (done) {
    api
    .post(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(userUpdate)
    .end(function (err, res) {
      expect(res.status).to.be.equal(200,'status expect 200')
      expect(res.body).to.have.all.keys('mess')
      done()
    })
  })

  it('constrast database', function (done) {
    User.findOne({'_id': user._id}, function (err, userdb) {
      if (err) {
        return done(err)
      }
      if (!userdb) {
        return done('user no found')
      }
      expect(userdb.name).to.be.equal(userUpdate.name)
      expect(userdb.dateBorn.toString()).to.be.equal(userUpdate.dateBorn.toString())
      expect(userdb.province).to.be.equal(userUpdate.province)
      expect(userdb.city).to.be.equal(userUpdate.city)
      expect(userdb.gender).to.be.equal(userUpdate.gender)
      // check location
      let l = userdb.location
      let ul = userUpdate.location
      expect(l.type).to.be.eql(ul.type)
      expect(l.coordinates[0]).to.be.eql(ul.coordinates[0])
      expect(l.coordinates[1]).to.be.eql(ul.coordinates[1])
      expect(userdb.role).to.be.equal('user')
      expect(userdb.active).to.be.equal(true)
      done()
    })
  })

  it('Fail update User', function (done) {
    api
    .post(`/users/${Types.ObjectId()}`)
    .set('Authorization', `Bearer ${token}`)
    .send(userUpdate)
    .end(function (err, res) {
      expect(res.status).to.be.equal(403,'status expect 403')
      expect(res.body).to.have.all.keys('status', 'success', 'message')
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
