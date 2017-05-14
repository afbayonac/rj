import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {encodeToken} from '../../app/lib/jwt'
import {IRemate} from '../../app/models/IRemate'
import {Remate, generateRawId} from '../../app/models/remate'

import {expect} from 'chai'
import * as supertest from 'supertest'
import {fkUser, fkRemate} from '../fakers'
import {connect, disconnect} from 'mongoose'

const db = cfg.mongodb
describe('create Remate API', function () {
  let token: string

  let api = supertest.agent(cfg.domain)
  let remate = fkRemate()
  let user = fkUser('scraper')

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
    User.create(user)
    .then(( userdb) => {
      token = encodeToken(userdb)
      done()
    })
    .catch(done)
  })

  it('create remate', function (done) {
    api
    .post(`/remates`)
    .set('Authorization', `Bearer ${token}`)
    .send(remate)
    .expect(200, {
      mess: 'remate created'
    }, done)
  })

  it('constrast database', function (done) {
    Remate
    .findOne({'rawid': generateRawId(remate.raw)})
    .lean()
    .then((rematedb: IRemate) => {
      expect(rematedb).to.exist
      expect(rematedb.raw).to.be.equal(remate.raw)
      expect(rematedb.fuente).to.be.equal(remate.fuente)
      expect(rematedb.fechaLicitacion).to.be.eql(remate.fechaLicitacion)
      expect(rematedb.demandantes).to.be.eql(remate.demandantes)
      expect(rematedb.demandados).to.be.eql(remate.demandados)
      rematedb.items.map((item) => {
        item._id = item._id.toString()
        return item
      })
      expect(rematedb.items).to.be.eql(remate.items)
      done()
    })
    .catch(done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
