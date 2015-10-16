'use strict';


var IndexModel = require('../models/index'),
    passport = require('passport'),
    ProfileModel = require('../models/profile'),
    AdminModel = require('../models/admin'),
    auth = require('../lib/auth');


module.exports = function (router) {

    var indexmodel = new IndexModel();
    var profilemodel = new ProfileModel();
    var adminmodel = new AdminModel();
    
    router.get('/', function (req, res) {
        res.render('index', indexmodel);
    });

    router.get('/auth/amazon',
    passport.authenticate('amazon', { scope: ['profile', 'postal_code'] }),
    function(req, res){
    // The request will be redirected to Amazon for authentication, so this
    // function will not be called.
    });


    // GET /auth/amazon/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    router.get('/auth/amazon/callback', 
      passport.authenticate('amazon', { failureRedirect: '/login' }),
      function(req, res) {
        console.log('It worked');
        res.redirect('/');
      });


    router.get('/profile', function(req, res) {
        res.render('profile', profilemodel);
    });


    router.get('/admin', function(req, res) {
        res.render('admin', adminmodel);
    });

    /**
     * Allow the users to log out
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

};
