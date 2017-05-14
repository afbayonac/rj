import {Types} from 'mongoose'
import {IUser} from '../app/models/IUser'
import {IRemate, IItem, IPerson} from '../app/models/IRemate'

import * as faker from 'faker'

export const fkUser = (role: 'user' | 'admin'| 'scraper' = 'admin'): IUser => {
  return {
    _id: Types.ObjectId().toHexString(),
    name: `${faker.name.firstName()}  ${faker.name.lastName()}`,
    emails: [{ email: faker.internet.email(), active: true }],
    number: faker.phone.phoneNumber(),
    username: faker.name.title(),
    city: faker.address.city(),
    province: faker.address.city(),
    location: {
      type: 'Point',
      coordinates: [+faker.address.longitude(), +faker.address.latitude()]
    },
    dateBorn: faker.date.past(16),
    cred: { password: faker.hacker.phrase() },
    role:  role,
    active: true
  }
}

export const fkItems = (n = 1): IItem[] => {
  return  Array.from({length: n}, (v, k) => {
    return {
      name: faker.commerce.product(),
      address: faker.address.streetAddress(),
      location: {
        type: 'Point',
        coordinates: [+faker.address.latitude(), +faker.address.longitude()]
      },
      base: faker.finance.amount().toString(),
      avaluo: faker.finance.amount().toString()
    }
  })
}

export const fkPersons = (n = 1): IPerson[] => {
  return  Array.from({length: n}, (v, k) => {
    return {
      name: faker.name.findName(),
      cc: '1095.935.974'
    }
  })
}

export const fkRemate = (items = 2, demandantes = 2, demandados = 2 ): IRemate => {

  return {
    _id: Types.ObjectId().toHexString(),
    items: fkItems(items),
    demandantes: fkPersons(demandantes),
    demandados: fkPersons(demandados),
    juzgado: faker.lorem.lines(),
    proceso: faker.lorem.words(5),
    fechaLicitacion: faker.date.recent(30),
    fuente: faker.internet.url(),
    raw: faker.lorem.paragraph()
  }
}
