const remateM = require('../models/remateM')

exports.create = (req, res, next) => {
  res.status(503).json({mess: 'servicio en construccion'})
}

exports.getByID = (req, res, next) => {
  var id = req.params.id

  remateM.findById(id)
  .exec((error, result) => {
    if (!error) {
      console.log(result)
      return res.status(200).json(result)
    } else {
      return next(error)
    }
  })
}

exports.list = (req, res, next) => {
  var count = req.query.count || 5
  var page = req.query.page || 1
  var options = {
    sort: ['-dateCreated'],
    start: (page - 1) * count,
    count: count
  }

  remateM
  .find()
  .order(options)
  .page(options, (error, results) => {
    if (!error) {
      return res.status(200).json(results)
    } else {
      return next(error)
    }
  })
  // Return res.status(200).json({ok:'ok'});
}

exports.update = (req, res, next) => {
  res.status(503).json({mess: 'servicio en construccion'})
}

exports.drop = (req, res, next) => {
  res.status(503).json({mess: 'servicio en construccion'})
}
