var express = require('express');
var router = express.Router();
const trainerCtrl = require('../controllers/trainers')

router.get('/', trainerCtrl.index);

module.exports = router;