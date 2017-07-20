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
router.get('/api/tags', function (req, res, next) {

    var db = req.database;
    var collection = db.collection(geotags_table_name);

    collection.find({}, {}, function (err, result) {
        if (err) throw err;

        var name = result;

        db.close();

        res.send(name);
    });
});

router.get('/test', function (req, res, next) {
    var response = {"text":"IT WORKS"};
    res.send(response);

});

router.get('/api/test/user_count', function (req, res, next) {
    var db = req.database;
    var collection = db.collection(users_table_name);
    collection.find({}, {}, function (err, result) {
        if (err) throw err;

        db.close();

        res.send(result.length + "");
    });
});



router.get('/api/add_tag', function (req, res, next) {

    var parsed_url = url_module.parse(req.url, true);

    var mongo = req.mongo;
    var db_url = req.db_url;

    var p_lat = parsed_url.query.lat;
    var p_lng = parsed_url.query.lng;
    var p_userid = parsed_url.query.user_id;
    var p_tagid = parsed_url.query.tag_id;
    var p_description = parsed_url.query.tag_description;
    var p_status = parsed_url.query.tag_status;
    var p_date = parsed_url.query.tag_date;

    var tag = {
        lat: p_lat,
        lng: p_lng,
        userid: p_userid,
        tagid: p_tagid,
        description: p_description,
        status: p_status,
        date: p_date
    };

    mongo.connect(db_url, function (err, db) {
        if (err) throw err;

        db.collection(geotags_table_name).insertOne(tag, function (err, res) {
            if (err) throw err;
            db.close();
        });
        res.send('0');
    });
});

router.get('/api/add_user', function (req, res, next) {

    var parsed_url = url_module.parse(req.url, true);

    var mongo = req.mongo;
    var db_url = req.db_url;

    var p_password = parsed_url.query.user_password;
    var p_email = parsed_url.query.user_email;
    var p_first_name = parsed_url.query.first_name;
    var p_last_name = parsed_url.query.last_name;
    var p_user_id = parsed_url.query.user_id;
    var p_rating = 0;
    var p_phone_number = parsed_url.query.phone_number;

    var user = {
        email: p_email,
        first_name: p_first_name,
        last_name: p_last_name,
        user_id: p_user_id,
        rating: p_rating,
        password: p_password,
        phone_number:p_phone_number
    };

    mongo.connect(db_url, function (err, db) {
        if (err) throw err;

        db.collection(users_table_name).insertOne(user, function (err, res) {
            if (err) throw err;
            db.close();
        });
        res.send('0');
    });
});

router.get('/api/login', function (req, res, next) {

    var parsed_url = url_module.parse(req.url, true);

    var mongo = req.mongo;
    var db_url = req.db_url;

    var p_email = parsed_url.query.user_email;
    var p_password = parsed_url.query.user_password;

    var login_request = {
        email:p_email,
        password:p_password
    };

    mongo.connect(db_url, function (err, db) {
        if (err) throw err;

        db.collection(users_table_name).find({email: login_request.email, password:login_request.password}).toArray(function (err, result) {
            if (err) throw err;

            db.close();

            res.send(result);
        });

    });
});

module.exports = router;
