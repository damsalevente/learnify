var request = require('request');
var multer = require('multer');
var path = require('path');

var apiOptions = {
    server: 'http://localhost:3000'
};


module.exports.homelist = function (req, res) {
    var requestOptions, fpath;
    fpath = '/api/depots';
    requestOptions = {
        url: apiOptions.server + fpath, // you know why it's required
        method: 'GET', // default is get, 
        json: {}, // good practice, and ensures that i get json back -> no, it gives back plain string, not json if i dont use it lmao

    };
    request(requestOptions, function (err, response, body) {
        if (err) {
            res.status(300);
            res.json(err);
        } else if (response.statusCode == 200) {
            res.render('pages/depots', {
                title: 'Depot list',
                depotlist: body,
            });
        } else {
            res.status(response.statusCode);
            res.json(response.body);
        }
    });

};

module.exports.depot_detail = function(req,res){
    var requestOptions, fpath;
    if(req.params && req.params.depotid){
        fpath = '/api/depots/' + req.params.depotid;

    }
    requestOptions = {
        url: apiOptions.server + fpath, // you know why it's required
        method: 'GET', // default is get, 
        json: {}, // good practice, and ensures that i get json back -> no, it gives back plain string, not json if i dont use it lmao

    };
    request(requestOptions, function (err, response, body) {
        if (err) {
            res.status(300);
            res.json(err);
        } else if (response.statusCode == 200) {
            res.render('pages/depot_detail', {
                title: 'Depot detail',
                depot: body,
            });
        } else {
            console.log(response);
            res.status(response.statusCode);
            res.json(response.body);
        }
    });
}