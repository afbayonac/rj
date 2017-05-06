import 'mocha'
import {User} from '../../app/models/user'
import {IUser} from '../../app/models/IUser'
import {expect, should, assert} from 'chai'
import {cfg} from '../../app/cfg/cfg'
import {connect, disconnect} from 'mongoose'
import * as faker from 'faker'

const db = cfg.mongodb

describe ('Encrypt Password', function () {

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      User.remove({}).exec(done)
    }, done)
  })

  it('Encrypt Password',function (done) {
    let usertest: IUser = {
      name: faker.name.firstName(),
      username: faker.name.lastName(),
      number: faker.phone.phoneNumber(),
      profileImgUrl: faker.image.imageUrl(),
      emails: [{email: faker.internet.email(), active: faker.random.boolean()}],
      role:  'user',
      cred: {
        password: faker.internet.password()
      }
    }
    new User(usertest)
    .save((err, user) => {
      if (err) {
        return done(err)
      }
      assert.isOk(user.contrastPasword(usertest.cred.password), 'fail encrypt')
      expect(user.name).to.be.a('string')
      expect(user.username).to.be.a('string')
      expect(user.number).to.be.a('string')
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
