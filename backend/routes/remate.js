const router = require('express').Router()
const remate = require('../controllers/remate')

router.get('/list', remate.list)
// (req ,res, next) =>{
//   res.json({ok:"ok"})
// });

module.exports = router
