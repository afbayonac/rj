import 'mocha'
import {Remate} from '../../app/models/remate'
import {IRemate} from '../../app/models/IRemate'
import {expect, should, assert} from 'chai'
import {cfg} from '../../app/cfg/cfg'
import {connect, disconnect} from 'mongoose'
import * as faker from 'faker'

const db = cfg.mongodb

describe ('Remate Model', function () {

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      Remate.remove({}).exec(done)
    }, done)
  })

  it('Generate hash',function (done) {
    let fakeRemate: IRemate = {
      item: [{
        name: faker.commerce.product(),
        address: faker.address.streetAddress(),
        location: {
          type: 'Point',
          coordinates: [
            +faker.address.latitude(),
            +faker.address.longitude()
          ]
        },
        base: faker.finance.amount().toString(),
        avaluo: faker.finance.amount().toString()
      }],
      demandante: [{
        name: faker.name.findName(),
        cc: '1095.935.974'
      }],
      demandado: [{
        name: faker.name.findName(),
        cc: '1095.935.974'
      }],
      juzgado: faker.lorem.lines(),
      proceso: faker.lorem.words(5),
      fechaLicitacion: faker.date.recent(30),
      fuente: faker.internet.url(),
      raw: faker.lorem.paragraph()
    }

    new Remate(fakeRemate)
    .save((err, remate: IRemate) => {
      if (err) {
        return done(err)
      }
      expect(remate.rawid).to.be.a('string')
      expect(remate.raw).to.be.a('string')
      expect(remate.item[1].location.coordinates[1]).to.be.a('string')
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
