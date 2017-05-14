import {cfg} from '../../app/cfg/cfg'
import {Remate} from '../../app/models/remate'

import {fkRemate} from '../fakers'
import {expect, should, assert} from 'chai'
import {connect, disconnect} from 'mongoose'

const db = cfg.mongodb

describe ('Remate Model', function () {
  let remate = fkRemate()

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`, done)
  })

  it('Generate hash',function (done) {
    new Remate(remate)
    .save()
    .then((rematedb) => {
      expect(rematedb.rawid).to.be.a('string')
      expect(rematedb.raw).to.be.a('string')
      expect(rematedb.items[0].location.coordinates[1]).to.be.a('number')
      done()
    })
    .catch(done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
