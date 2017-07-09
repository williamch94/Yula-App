var express = require('express');
var router = express.Router();
var db;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yula Server App' });
});

/* GET Locations API */
router.get('/locations', function(req, res, next) {
    var db = req.database;
    res.send('Yolo')
});

module.exports = router;
