'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('../lib/authAmazon'),
    userLib = require('./user')(),
    permissionLib = require('./permission')(),
    db = require('../lib/database'),
    crypto = require('../lib/crypto');

module.exports = function spec(app) {
    app.on('middleware:after:session', function configPassport(eventargs) {
        //Tell passport to use our newly created local strategy for authentication
        passport.use(auth.AmazonStrategy());
        //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
        passport.serializeUser(userLib.serialize);
        passport.deserializeUser(userLib.deserialize);
        app.use(passport.initialize());
        app.use(passport.session());
    });
    return {
        onconfig: function(config, next) {

            var dbConfig = config.get('databaseConfig'),
                cryptConfig = config.get('bcrypt');
            
            crypto.setCryptLevel(cryptConfig.difficulty);
            db.config(dbConfig);
            userLib.addUsers();
            permissionLib.addPermissions();
            next(null, config);
        }
    };

};