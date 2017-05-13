import 'mocha'
import {expect} from 'chai'
import {User} from '../../app/models/user'
import {Remate} from '../../app/models/remate'
import {encodeToken} from '../../app/lib/jwt'
import {cfg} from '../../app/cfg/cfg'
import * as supertest from 'supertest'
import {connect, disconnect} from 'mongoose'
import {fkUser, fkRemate} from '../fakers'

const db = cfg.mongodb
describe('Update Remate API', function () {
  let api = supertest.agent(cfg.domain)
  let token: string
  let id: string
  let remate = fkRemate()
  let remateUpdate = fkRemate()
  let user = fkUser()
  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(done, done)
  })

  before(function (done) {
    User.remove({}).exec(done)
  })

  before(function (done) {
    Remate.remove({}).exec(done)
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

  before(function (done) {
    new Remate(remate)
    .save((err, remateid) => {
      if (err) {
        return done(err)
      }
      done()
    })
  })

  it('update remate', function (done) {
    api
    .post(`/remates/${remate._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(remateUpdate)
    .end(function (err, res) {
      expect(res.status).to.be.equal(200,'status expect 200')
      expect(res.body).to.have.all.keys('mess')
      done()
    })
  })

  it('constrast database', function (done) {
    Remate.findOne({'_id': remate._id}, function (err, rematedb) {
      if (err) {
        return done(err)
      }
      if (!rematedb) {
        return done('remate no found')
      }
      expect(rematedb.raw).to.be.not.equal(remateUpdate.raw)
      expect(rematedb.fuente).to.be.not.equal(remateUpdate.fuente)
      expect(rematedb.fechaLicitacion.toString()).to.be.equal(remateUpdate.fechaLicitacion.toString())
      // check demandantes
      expect(rematedb.demandante[0].name).to.be.equal(remateUpdate.demandante[0].name)
      expect(rematedb.demandante[0].cc).to.be.equal(remateUpdate.demandante[0].cc)
      expect(rematedb.demandante[1].name).to.be.equal(remateUpdate.demandante[1].name)
      expect(rematedb.demandante[1].cc).to.be.equal(remateUpdate.demandante[1].cc)
      // check demandandos
      expect(rematedb.demandado[0].name).to.be.equal(remateUpdate.demandado[0].name)
      expect(rematedb.demandado[0].cc).to.be.equal(remateUpdate.demandado[0].cc)
      expect(rematedb.demandado[0].name).to.be.equal(remateUpdate.demandado[0].name)
      expect(rematedb.demandado[0].cc).to.be.equal(remateUpdate.demandado[0].cc)
      // check item 1
      expect(rematedb.item[0].name).to.be.equal(remateUpdate.item[0].name)
      expect(rematedb.item[0].address).to.be.equal(remateUpdate.item[0].address)
      expect(rematedb.item[0].base).to.be.equal(remateUpdate.item[0].base)
      expect(rematedb.item[0].base).to.be.equal(remate.item[0].base)
      // check location item 1
      let ldb = rematedb.item[0].location
      let l = remateUpdate.item[0].location
      expect(ldb.type).to.be.eql(l.type)
      expect(ldb.coordinates[0]).to.be.eql(l.coordinates[0])
      expect(ldb.coordinates[1]).to.be.eql(l.coordinates[1])
      // check item 2
      expect(rematedb.item[1].name).to.be.equal(remateUpdate.item[1].name)
      expect(rematedb.item[1].address).to.be.equal(remateUpdate.item[1].address)
      expect(rematedb.item[1].base).to.be.equal(remateUpdate.item[1].base)
      expect(rematedb.item[1].base).to.be.equal(remateUpdate.item[1].base)
      // check location item 2
      ldb = rematedb.item[1].location
      l = remateUpdate.item[1].location
      expect(ldb.type).to.be.eql(l.type)
      expect(ldb.coordinates[0]).to.be.eql(l.coordinates[0])
      expect(ldb.coordinates[1]).to.be.eql(l.coordinates[1])
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
