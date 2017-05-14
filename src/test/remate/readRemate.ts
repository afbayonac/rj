import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {encodeToken} from '../../app/lib/jwt'
import {Remate} from '../../app/models/remate'

import {expect} from 'chai'
import * as supertest from 'supertest'
import {fkUser, fkRemate} from '../fakers'
import {connect, disconnect} from 'mongoose'

const db = cfg.mongodb
describe('read remates api', function () {
  let api = supertest.agent(cfg.domain)
  let remate = fkRemate()
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

  it('read remates', function (done) {
    api
    .get(`/remates/${remate._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((res) => {
      expect(res).to.exist
      expect(res.raw).to.be.equal(remate.raw)
      expect(res.fuente).to.be.equal(remate.fuente)
      expect(res.juzgado).to.be.equal(remate.juzgado)
      expect(res.fechaLicitacion).to.be.eql(remate.fechaLicitacion)
      expect(res.demandantes).to.be.eql(remate.demandantes)
      expect(res.demandados).to.be.eql(remate.demandados)
      expect(res.items).to.be.eql(remate.items)
      done()
    })
    .catch(done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
