/**
 * Created by carolineperier on 11/05/2017.
 */

var express = require('express');
var router = express.Router();
var assert = require('assert');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Basic Node Functions', success: req.session.success, errors: req.session.errors });
    req.session.errors = null;
});

module.exports = router;
