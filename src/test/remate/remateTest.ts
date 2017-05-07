import 'mocha'
import {Remate} from '../../app/models/remate'
import {expect, should, assert} from 'chai'
import {cfg} from '../../app/cfg/cfg'
import {connect, disconnect} from 'mongoose'
import {fkRemate} from '../fakers'

const db = cfg.mongodb

describe ('Remate Model', function () {

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      Remate.remove({}).exec(done)
    }, done)
  })

  it('Generate hash',function (done) {
    new Remate(fkRemate)
    .save((err, remate) => {
      if (err) {
        return done(err)
      }
      expect(remate.rawid).to.be.a('string')
      expect(remate.raw).to.be.a('string')
      expect(remate.item[0].location.coordinates[1]).to.be.a('number')
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
