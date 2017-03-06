const remateM = require('../models/remateM')

exports.create = () => {

}

exports.getByID = () => {

}

exports.list = (req, res, next) => {
  var count = req.query.count || 5
  var page = req.query.pagee || 1

  var options = {
    start: (page - 1) + count,
    count: count
  }

  remateM
  .find()
  .page(options, (error, results) => {
    if (!error) {
      return res.status(200).json(results)
    } else {
      return next(error)
    }
  })
  // Return res.status(200).json({ok:'ok'});
}

exports.update = () => {

}

exports.drop = () => {

}
