import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {encodeToken} from '../../app/lib/jwt'
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
    new User(user)
    .save((err, userdb) => {
      if (err) {
        return done(err)
      }
      token = encodeToken(userdb)
      done()
    })
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
    .then((rematedb) => {
      if (!rematedb) {
        return done('remate no found')
      }
      expect(rematedb.raw).to.be.equal(remate.raw)
      expect(rematedb.fuente).to.be.equal(remate.fuente)
      expect(rematedb.fechaLicitacion.toString()).to.be.equal(remate.fechaLicitacion.toString())
      // check demandantes
      expect(rematedb.demandantes[0].name).to.be.equal(remate.demandantes[0].name)
      expect(rematedb.demandantes[0].cc).to.be.equal(remate.demandantes[0].cc)
      expect(rematedb.demandantes[1].name).to.be.equal(remate.demandantes[1].name)
      expect(rematedb.demandantes[1].cc).to.be.equal(remate.demandantes[1].cc)
      // check demandandos
      expect(rematedb.demandados[0].name).to.be.equal(remate.demandados[0].name)
      expect(rematedb.demandados[0].cc).to.be.equal(remate.demandados[0].cc)
      expect(rematedb.demandados[0].name).to.be.equal(remate.demandados[0].name)
      expect(rematedb.demandados[0].cc).to.be.equal(remate.demandados[0].cc)
      // check item 1
      expect(rematedb.items[0].name).to.be.equal(remate.items[0].name)
      expect(rematedb.items[0].address).to.be.equal(remate.items[0].address)
      expect(rematedb.items[0].base).to.be.equal(remate.items[0].base)
      expect(rematedb.items[0].base).to.be.equal(remate.items[0].base)
      // check location item 1
      let ldb = rematedb.items[0].location
      let l = remate.items[0].location
      expect(ldb.type).to.be.eql(l.type)
      expect(ldb.coordinates[0]).to.be.eql(l.coordinates[0])
      expect(ldb.coordinates[1]).to.be.eql(l.coordinates[1])
      // check item 2
      expect(rematedb.items[1].name).to.be.equal(remate.items[1].name)
      expect(rematedb.items[1].address).to.be.equal(remate.items[1].address)
      expect(rematedb.items[1].base).to.be.equal(remate.items[1].base)
      expect(rematedb.items[1].base).to.be.equal(remate.items[1].base)
      // check location item 2
      ldb = rematedb.items[1].location
      l = remate.items[1].location
      expect(ldb.type).to.be.eql(l.type)
      expect(ldb.coordinates[0]).to.be.eql(l.coordinates[0])
      expect(ldb.coordinates[1]).to.be.eql(l.coordinates[1])
      done()
    })
    .catch(done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
