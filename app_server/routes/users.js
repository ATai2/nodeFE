var express = require('express');
var router = express.Router();
var cinemaMenuController = require('../controllers/CinemaMenuController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/cinemamenu',function(req, res, next){
    res.send('respond with a resource');
});

module.exports = router;
