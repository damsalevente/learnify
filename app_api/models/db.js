var mongoose = require('mongoose');


var dbURI = 'mongodb://localhost/companio';
mongoose.connect(dbURI);


// add one more connnection
var logDB = mongoose.createConnection(dbURI + 'Logging');



logDB.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI + 'Logging');
})


mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});





var shutdownMongo = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);

    });
    logDB.close(function () {
        console.log('Mongoose log server disconnected on ' + msg);
        callback();
    })

};

// Signal catching

process.once('SIGUSR2', function () {
    shutdownMongo('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function () {
    shutdownMongo('app termination', function () {
        process.exit(0);
    });
});
process.on('SIGTERM', function () {
    shutdownMongo('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./depot');
require('./order');
require('./partner');
require('./product');