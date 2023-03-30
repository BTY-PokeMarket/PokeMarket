var express = require('express');
var router = express.Router();
const trainerCtrl = require('../controllers/trainers')

// GET ROUTES
// localhost:3000/trainers
router.get('/', trainerCtrl.index);

module.exports = router;