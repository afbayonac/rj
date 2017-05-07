import * as faker from 'faker'
import {IUser} from '../app/models/IUser'
import {IRemate} from '../app/models/IRemate'

export const fkUser: IUser = {
  name: `${faker.name.firstName()}  ${faker.name.lastName()}`,
  emails: [{ email: faker.internet.email(), active: true }],
  number: faker.phone.phoneNumber(),
  username: faker.name.title(),
  city: faker.address.city(),
  province: faker.address.city(),
  locations: {
    type: 'Point',
    coordinates: [+faker.address.longitude(), +faker.address.latitude()]
  },
  dateBorn: faker.date.past(16),
  cred: { password: faker.hacker.phrase() },
  role: 'admin'
}

export const fkRemate: IRemate = {
  item: [{
    name: faker.commerce.product(),
    address: faker.address.streetAddress(),
    location: {
      type: 'Point',
      coordinates: [+faker.address.latitude(), +faker.address.longitude()]
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
