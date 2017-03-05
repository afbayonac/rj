var router =  require('express').Router();
const mine = require('../controllers/mine');

router.post('/', (req, res, next) => {
    var dateInit = req.body.dateInit;
    mine(dateInit);
    res.status(200).send();
})

module.exports = router;
