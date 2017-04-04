const router = require('express').Router()
const remate = require('../controllers/remate')

router.get('/', remate.list)
router.get('/:id', remate.getByID)
router.post('/:id', remate.update)
// (req ,res, next) =>{
//   res.json({ok:"ok"})
// });

module.exports = router
