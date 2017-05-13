import 'mocha'
import {Remate} from '../../app/models/remate'
import {expect, should, assert} from 'chai'
import {cfg} from '../../app/cfg/cfg'
import {connect, disconnect} from 'mongoose'
import {fkRemate} from '../fakers'

const db = cfg.mongodb

describe ('Remate Model', function () {
  let remate = fkRemate()

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      Remate.remove({}).exec(done)
    }, done)
  })

  it('Generate hash',function (done) {
    new Remate(remate)
    .save((err, rematedb) => {
      if (err) {
        return done(err)
      }
      expect(rematedb.rawid).to.be.a('string')
      expect(rematedb.raw).to.be.a('string')
      expect(rematedb.items[0].location.coordinates[1]).to.be.a('number')
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
