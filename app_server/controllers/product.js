var request = require('request');
var apiOptions = {
    server: 'http://localhost:3000'
};

/* GET home page */
module.exports.homelist = function(req,res){
    var requestOptions, path;
    path = '/api/products';
    requestOptions = {
        url: apiOptions.server + path, // you know why it's required
        method: 'GET',  // default is get, 
        json:{},        // good practice, and ensures that i get json back
        
    };
    request(requestOptions, function(err,response,body){
        if(err) {
            res.status(300);
            res.json(err);
        } else if(response.statusCode == 200){
        res.render('pages/products',{
            title: 'Product list',
            productlist: body,
        });
    } else {
        res.status(response.statusCode);
        res.json(response.body);
    }
    });

};