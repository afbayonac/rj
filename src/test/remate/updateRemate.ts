import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {encodeToken} from '../../app/lib/jwt'
import {Remate} from '../../app/models/remate'
import {IRemate} from '../../app/models/IRemate'

import {expect} from 'chai'
import * as supertest from 'supertest'
import {fkUser, fkRemate} from '../fakers'
import {connect, disconnect} from 'mongoose'

const db = cfg.mongodb
describe('Update Remate API', function () {
  let api = supertest.agent(cfg.domain)
  let remate = fkRemate()
  let remateUpdate = fkRemate()
  let user = fkUser()
  let token = encodeToken(user)

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`, done)
  })

  before(function (done) {
    User.remove({}).then(done()).catch(done)
  })

  before(function (done) {
    Remate.remove({}).then(done()).catch(done)
  })

  before(function (done) {
    User.create(user).then(done()).catch(done)
  })

  before(function (done) {
    Remate.create(remate).then(done()).catch(done)
  })

  it('update remate', function (done) {
    api
    .post(`/remates/${remate._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(remateUpdate)
    .expect(200,{
      mess: 'remate updated'
    },done)
  })

  it('constrast database', function (done) {
    Remate
    .findOne({'_id': remate._id})
    .lean()
    .then((rematedb: IRemate) => {
      expect(rematedb).to.exist
      // elemtos que no cambian
      expect(rematedb.raw).to.be.not.equal(remateUpdate.raw)
      expect(rematedb.fuente).to.be.not.equal(remateUpdate.fuente)
      expect(rematedb.juzgado).to.be.equal(remateUpdate.juzgado)
      // elemetos que deberian actualizarse
      expect(rematedb.fechaLicitacion).to.be.eql(remateUpdate.fechaLicitacion)
      expect(rematedb.demandantes).to.be.eql(remateUpdate.demandantes)
      expect(rematedb.demandados).to.be.eql(remateUpdate.demandados)
      rematedb.items.map((item) => {
        item._id = item._id.toString()
        return item
      })
      expect(rematedb.items).to.be.eql(remateUpdate.items)
      done()
    })
    .catch(done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
