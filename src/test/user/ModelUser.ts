import 'mocha'
import {User} from '../../app/models/user'
import {expect, should, assert} from 'chai'
import {cfg} from '../../app/cfg/cfg'
import {connect, disconnect} from 'mongoose'
import {fkUser} from '../fakers'

const db = cfg.mongodb

describe ('User Model', function () {
  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      User.remove({}).exec(done)
    }, done)
  })

  it('Encrypt Password',function (done) {
    new User(fkUser)
    .save((err, user) => {
      if (err) {
        return done(err)
      }
      assert.isOk(user.contrastPasword(fkUser.cred.password), 'fail encrypt')
      expect(user.name).to.be.a('string')
      expect(user.username).to.be.a('string')
      expect(user.number).to.be.a('string')
      expect(user.dateBorn).to.be.instanceOf(Date)
      expect(user.emails).to.be.instanceof(Array)
      expect(user.role).to.be.a('string')
      expect(user.cred.password).to.match(/\w{128}$/)
      expect(user.cred.salt).to.match(/\w{16}$/)
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
