var express = require('express');
var router = express.Router();
var url_module = require('url');

var table_name = 'geotags';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yula Server App' });
});

/* GET Locations API */
router.get('/api/locations', function(req, res, next) {
    var db = req.database;
    var collection = db.collection(table_name);
    collection.find({},{},function(err,result){
        if (err) throw err;
        var name = result;
        db.close();
        res.send(name);
    });
});

router.get('/api/addLocation', function(req, res, next) {

    var parsed_url = url_module.parse(req.url, true);

    var mongo = req.mongo;
    var db_url = req.db_url;

    var p_lat = parsed_url.lat;
    var p_lng = parsed_url.lng;
    var p_userid = parsed_url.userid;

    var location = {lat:p_lat, lng:p_lng, userid: p_userid };

    mongo.connect(db_url, function (err, db) {
        if (err) throw err;

        db.collection(table_name).insertOne(location, function (err, res) {
            if (err) throw err;
            db.close();
        });
        res.send('Inserted!');
    });
});

module.exports = router;
