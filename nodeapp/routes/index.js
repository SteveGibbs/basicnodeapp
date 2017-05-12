var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;  // mongo ID is an object ID not a string ID.
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Basic Node Functions', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});


router.get('/get-data', function(req, res, next){
  var resultArray = [];
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('travel').find();
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      resultArray.push(doc);
      console.log(resultArray);
    }, function(){
      db.close();
      res.render('index', {items: resultArray, success: req.session.success, errors: req.session.errors});
      req.session.errors = null;
    });
  });
});

router.post('/insert', function(req, res, next) {
    var item = {
        country: req.body.country,
        description: req.body.description,
        image: req.body.image
    };

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('travel').insertOne(item, function (err, result) {
            assert.equal(null, err);
            console.log('item inserted');
            db.close();
        });
    });
    res.redirect('/get-data');
});

router.post('/update', function(req, res, next){

    var item = {
        country: req.body.country,
        description: req.body.description,
        image: req.body.image
    };

    var id = req.body.id;

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        //pass the id into the objectId function to transform it into an objectId that Mongo recognises as the
        // first parameter then use $set to say what the new data should be
        //$set just updates only the selected fields;
        db.collection('travel').updateOne({'_id': objectId(id)}, {$set: item}, function (err, result) {
            assert.equal(null, err);
            console.log('item updated');
            db.close();

        });
    });

});



router.post('/delete', function(req, res, next){
    var id = req.body.id;

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('travel').deleteOne({'_id': objectId(id)}, function (err, result) {
            assert.equal(null, err);
            console.log('item deleted');
            db.close();

        });
    });

});

router.post('/submit', function(req, res, next){
    //check
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    if (errors){
        req.session.errors = errors;
        req.session.success = false;
    }
    else {
        req.session.success = true;
    }
    //console.log("help");
    res.redirect("/get-data");
});

router.get('/get-data/:id', function(req, res, next){

    res.render('show', {id: req.params.id, item: req.params.id});



});


router.get('/test/:id', function(req, res, next){
  res.render('test', {output: req.params.id});
});



router.post('/test/submit', function(req, res, next){
  var id = req.body.id;
  res.redirect('/test/' + id);
});

router.post('/login', function(req, res, next){
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    if (errors){
        req.session.errors = errors;
        req.session.success = false;
    }
    else {
        req.session.success = true;
    }
    console.log("help");
    res.redirect("/login");
});

module.exports = router;


