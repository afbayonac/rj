import {Document, Schema, Model, model, PaginateModel} from 'mongoose'
import {IRemate} from './IRemate'
import {createHash} from 'crypto'
import * as mp from 'mongoose-paginate'

export interface IRemateModel extends IRemate, Document {
  _id: string
  generateRawId (raw: string): string
}

export interface IRemateModelPaginate<T extends Document> extends PaginateModel<T> {}

export const UserSchema: Schema = new Schema({
  items: [{
    name: String,
    location: {
        coordinates: [Number],
        type: {type: String}
    },
    address: String,
    base: String,
    avaluo: String
  }],
  demandantes: [{
    _id: false,
    name: String,
    cc: String
  }],
  demandados: [{
    _id: false,
    name: String,
    cc: String
  }],
  juzgado: String,
  proceso: String,
  fechaLicitacion: Date,
  fuente: { type: String, required: true },
  raw: { type: String, required: true },
  rawid: { type: String, unique: true }
})

export const generateRawId = (raw: string): string => {
  return createHash('sha512').update(raw).digest('hex')
}

UserSchema.pre('save',function (next) {
  if (!this.isModified('raw')) {return next()}
  this.rawid = generateRawId(this.raw)
  next()
})

UserSchema.plugin(mp)

export const Remate: IRemateModelPaginate<IRemateModel> = model<IRemateModel>('Remate', UserSchema)

export default Remate
