import {Remate, generateRawId} from '../models/remate'
import {IRemate} from '../models/IRemate'
import {Types} from 'mongoose'

export const createRemate = (req, res, next) => {
  let newRemate: IRemate = req.body

  if (!newRemate.fuente || !newRemate.raw) {
    return res.status(400).json({'mess': 'bad request'})
  }
  Remate.findOne({'rawid': generateRawId(newRemate.raw) }).then((remate) => {
      if (remate) {
        return res.status(400).json({'mess': 'remate registered'})
      }
      new Remate({
        raw : newRemate.raw,
        items: newRemate.items,
        fuente: newRemate.fuente,
        demandantes: newRemate.demandantes,
        demandados: newRemate.demandados,
        juzgado: newRemate.juzgado,
        proceso: newRemate.proceso,
        fechaLicitacion: newRemate.fechaLicitacion
      })
      .save()
      .then((remate) =>  res.status(200).json({'mess': 'remate created'}))
      .catch((err) => res.status(500).json({'mess': 'server error'}))
    })
    .catch((err) => res.status(500).json({'mess': 'server error'}))
}

export const updateRemate = (req, res, next) => {
  let attrs = req.body

  Remate
  .findOne({'_id': req.params.idremates})
  .then((remate) => {
    if (!remate) {
      return res.status(400).json({'mess': 'remate no found'})
    }
    remate.items = attrs.items ? attrs.items : remate.items
    remate.demandantes = attrs.demandantes ? attrs.demandantes : remate.demandantes
    remate.demandados = attrs.demandados ? attrs.demandados : remate.demandados
    remate.juzgado = attrs.juzgado ? attrs.juzgado : remate.juzgado
    remate.fechaLicitacion = attrs.fechaLicitacion ? attrs.fechaLicitacion : remate.fechaLicitacion
    remate.save()
    .then(() =>  res.status(200).json({'mess': 'remate updated'}))
    .catch((err) => res.status(500).json({'mess': 'server error'}))
  })
  .catch((err) => res.status(500).json({'mess': 'server error'}))
}
