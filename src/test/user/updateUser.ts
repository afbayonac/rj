import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {IUser} from '../../app/models/IUser'
import {encodeToken} from '../../app/lib/jwt'

import {expect} from 'chai'
import {fkUser} from '../fakers'
import * as supertest from 'supertest'
import {connect, disconnect, Types} from 'mongoose'

const db = cfg.mongodb
describe('update user api', function () {

  let api = supertest.agent(cfg.domain)
  let user = fkUser('user')
  let token = encodeToken(user)
  let userUpdate = fkUser('admin')

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`, done)
  })

  before(function (done) {
    User.remove({}).then(done()).catch(done)
  })

  before(function (done) {
    User.create(user).then(done()).catch(done)
  })

  it('update user api', function (done) {
    api
    .post(`/users/${user._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(userUpdate)
    .expect(200, {
      mess: 'user updated'
    },done)
  })

  it('constrast database', function (done) {
    User
    .findOne({'_id': user._id})
    .lean()
    .then((userdb: IUser) => {
      expect(userdb).to.exist
      expect(userdb.name).to.be.equal(userUpdate.name)
      expect(userdb.dateBorn.toString()).to.be.equal(userUpdate.dateBorn.toString())
      expect(userdb.province).to.be.equal(userUpdate.province)
      expect(userdb.city).to.be.equal(userUpdate.city)
      expect(userdb.gender).to.be.equal(userUpdate.gender)
      expect(userdb.location).to.be.eql(userUpdate.location)
      expect(userdb.role).to.be.equal('user')
      expect(userdb.active).to.be.equal(true)
      done()
    })
    .catch(done)
  })

  it('fail update User', function (done) {
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
