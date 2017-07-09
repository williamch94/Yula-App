var express = require('express');
var router = express.Router();
var url_module = require('url');
var db;
var table_name = 'geotags';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yula Server App' });
});

/* GET Locations API */
router.get('/api/locations', function(req, res, next) {
    var parsed_url = url_module.parse(req.url, true);

    var db = req.database;
    var collection = db.collection(table_name);
    collection.find({},{},function(err,result){
        if (err) throw err;
        var name = result[0];
        db.close();
        res.send(name);
    });
});

router.get('/api/test', function(req, res, next) {
    var parsed_url = url_module.parse(req.url, true);

    var db = req.database;
    var myobj = { id: "123", lat:"222", lng:"333", userid: "567" };
    db.collection(table_name).insertOne(myobj, function(err, res) {
        if (err) throw err;
        db.close();
        res.send('Inserted!');
    });
});

module.exports = router;
