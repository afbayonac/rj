interface IEmail {
  email: string
  active: boolean
}

export interface ILocation {
  type: 'Point'
  coordinates: number[] | number[][]
}

export interface IUser {
  name?: string
  username: string
  number?: string // numero de telefono puede ser un identificador unico
  profileImgUrl?: string
  facebookId?: string
  emails: IEmail[]
  city?: string
  dateBorn?: Date
  province?: string
  role: 'admin' | 'user'
  locations?: ILocation[]
  cred: {
    password?: string,
    salt?: string
  },
  gender?: string
  contrastPasword? (password: string): boolean
}
