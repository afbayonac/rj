export interface IItem {
  name: string
  location?: ILocation
  address?: string
  base: string
  avaluo: string
}

export interface ILocation {
  type: 'Point'
  coordinates: number[] | number[][]
}

export interface IPerson {
  name: string
  cc: string
}

export interface IRemate {
  item?: IItem[]
  demandante?: IPerson[]
  demandado?: IPerson[]
  juzgado?: string
  proceso?: string
  fechaLicitacion?: Date
  fuente: string
  raw: string
  rawid?: string
}
