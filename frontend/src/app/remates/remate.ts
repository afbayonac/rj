interface property {
  item : string;
  location: string;
  base: string;
}

interface person{
  name: string;
  cc: string;
}

export interface RemateJSON {
  Properties?: Array<property>;
  demandante?: Array<person>;
  demandando?: Array<person>;
  juzgado?: string;
  proceso?: string;
  fechaLicitacion?: string;
  dateCreated: string;
  fuente: string;
  raw: string;
  rawid: string;
}

export class Remate {
  constructor (public remate:RemateJSON){};
}
