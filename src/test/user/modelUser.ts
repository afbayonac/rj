import 'mocha'
import {User} from '../../app/models/user'
import {expect, should, assert} from 'chai'
import {cfg} from '../../app/cfg/cfg'
import {connect, disconnect} from 'mongoose'
import {fkUser} from '../fakers'

const db = cfg.mongodb

describe ('User Model', function () {
  let user = fkUser()
  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      User.remove({}).exec(done)
    }, done)
  })

  it('Encrypt Password',function (done) {
    new User(user)
    .save((err, userdb) => {
      if (err) {
        return done(err)
      }
      assert.isOk(userdb.contrastPasword(user.cred.password), 'fail encrypt')
      expect(userdb.name).to.be.a('string')
      expect(userdb.username).to.be.a('string')
      expect(userdb.number).to.be.a('string')
      expect(userdb.dateBorn).to.be.instanceOf(Date)
      expect(userdb.emails).to.be.instanceof(Array)
      expect(userdb.role).to.be.a('string')
      expect(userdb.cred.password).to.match(/\w{128}$/)
      expect(userdb.cred.salt).to.match(/\w{16}$/)
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
