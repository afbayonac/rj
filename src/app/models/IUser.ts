// pueden realizar una corfirmacion adicional si expira la primera
import {Types} from 'mongoose'
export interface IVerify {
  code: string
  expiration: Date
  _id?: any
}

interface IEmail {
  email: string
  active: boolean
  verify?: IVerify[]
  _id?: any
}

export interface ILocation {
  type: 'Point'
  coordinates: number[] | number[][]
}

export interface IUser {
  _id: string
  name?: string
  username: string
  number?: string // numero de telefono puede ser un identificador unico
  profileImgUrl?: string
  facebookId?: string
  emails: IEmail[]
  city?: string
  dateBorn?: Date
  province?: string
  role: 'admin' | 'user' | 'scraper'
  location?: ILocation
  cred?: {
    password: string,
    salt?: string
  },
  gender?: string
  active?: boolean
  contrastPasword? (password: string): boolean
}
