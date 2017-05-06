import {Document, Schema, Model, model} from 'mongoose'
import {IRemate} from './IRemate'
import {createHash } from 'crypto'

export interface IRenateModel extends IRemate, Document {
  generateRawId (raw: string): string
}

export const UserSchema: Schema = new Schema({
  item: [{
    name: String,
    location: {
        coordinates: [Number],
        type: {type: String}
    },
    address: String,
    base: String,
    avaluo: String
  }],
  demandante: [{
    name: String,
    cc: String
  }],
  demandando: [{
    name: String,
    cc: String
  }],
  juzgado: String,
  proceso: String,
  fechaLicitacion: Date,
  fuente: { type: String, required: false },
  raw: { type: String, required: false },
  rawid: { type: String, unique: true, required: false }
})

let generateRawId = (raw: string): string => {
  return createHash('sha512').update(raw).digest('hex')
}

UserSchema.pre('save',function (next) {
  if (!this.isModified('raw')) {return next()}
  this.rawid = generateRawId(this.raw)
  next()
})

export const Remate: Model<IRenateModel> = model<IRenateModel>('Remate', UserSchema)

export default Remate
