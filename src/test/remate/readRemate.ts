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
  let remates =  Array.from({length: 100}, (v, k) => fkRemate())
  let user = fkUser()
  let token = encodeToken(user)
  // seleciona una numero de elementos rando m por pagina
  let count = Math.floor(Math.random() * 19 ) + 1
  // seleciona una pagina al azar
  let page = Math.floor(Math.random() * ( (remates.length / count) - 1 ) ) + 1

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
    Remate.create(remates).then(done()).catch(done)
  })

  it('read remates', function (done) {
    api
    .get(`/remates?page=${page}&&count=${count = 1}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((res) => {
      let body = res.body
      expect(body).to.exist
      expect(body.page).to.be.equal(page)
      expect(body.limit).to.be.equal(count)
      expect(body.total).to.be.equal(remates.length)
      expect(body.docs.length).to.be.equal(count)
      done()
    })
    .catch(done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
