import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {Remate} from '../../app/models/remate'
import {encodeToken} from '../../app/lib/jwt'

import {expect} from 'chai'
import * as supertest from 'supertest'
import {fkUser, fkRemate} from '../fakers'
import {connect, disconnect, Types} from 'mongoose'

const db = cfg.mongodb
describe('Update User API', function () {
  let token: string
  let id: string

  let api = supertest.agent(cfg.domain)
  let user = fkUser('user')
  let userUpdate = fkUser('admin')

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`, done)
  })

  before(function (done) {
    User.remove({}).then(done()).catch(done)
  })

  before(function (done) {
    new User(user)
    .save()
    .then((userdb) => {
      id = userdb._id
      token = encodeToken(userdb)
      done()
    })
    .catch(done)
  })

  it('update User', function (done) {
    api
    .post(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(userUpdate)
    .expect(200, {
      mess: 'user updated'
    },done)
  })

  it('constrast database', function (done) {
    User.findOne({'_id': user._id})
    .then((userdb) => {
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
    .catch(done)
  })

  it('Fail update User', function (done) {
    api
    .post(`/users/${Types.ObjectId()}`)
    .set('Authorization', `Bearer ${token}`)
    .send(userUpdate)
    .expect(403,{
      status: 'Access Denied',
      success: false,
      message: 'Forbidden'
    },done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
