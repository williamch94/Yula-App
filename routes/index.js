var express = require('express');
var router = express.Router();
var url_module = require('url');

var geotags_table_name = 'geotags';
var users_table_name = 'users';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Yula Server App'});
});

/* GET Locations API */
router.get('/api/locations', function (req, res, next) {

    var db = req.database;
    var collection = db.collection(geotags_table_name);

    collection.find({}, {}, function (err, result) {
        if (err) throw err;

        var name = result;

        db.close();

        res.send(name);
    });
});

router.get('/api/test/user_count', function (req, res, next) {
    var db = req.database;
    var collection = db.collection(users_table_name);
    collection.find({}, {}, function (err, result) {
        if (err) throw err;

        db.close();

        res.send(result.length+"");
    });
});

router.get('/api/add_location', function (req, res, next) {

    var parsed_url = url_module.parse(req.url, true);

    var mongo = req.mongo;
    var db_url = req.db_url;

    var p_lat = parsed_url.query.lat;
    var p_lng = parsed_url.query.lng;
    var p_userid = parsed_url.query.userid;

    var location = {lat: p_lat, lng: p_lng, userid: p_userid};

    mongo.connect(db_url, function (err, db) {
        if (err) throw err;

        db.collection(geotags_table_name).insertOne(location, function (err, res) {
            if (err) throw err;
            db.close();
        });
        res.send('Inserted!');
    });
});

router.get('/api/add_user', function (req, res, next) {

    var parsed_url = url_module.parse(req.url, true);

    var mongo = req.mongo;
    var db_url = req.db_url;

    var p_username = parsed_url.query.username;
    var p_first_name = parsed_url.query.first_name;
    var p_last_name = parsed_url.query.last_name;
    var p_user_id = parsed_url.query.user_id;
    var p_rating = 0;

    var user = {username: p_username, first_name: p_first_name, last_name: p_last_name, user_id: p_user_id, rating: p_rating};

    mongo.connect(db_url, function (err, db) {
        if (err) throw err;

        db.collection(users_table_name).insertOne(user, function (err, res) {
            if (err) throw err;
            db.close();
        });
        res.send('Inserted!');
    });
});

module.exports = router;
