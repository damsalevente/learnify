var request = require('request');
var multer = require('multer');
var path = require('path');

var apiOptions = {
    server: 'http://localhost:3000'
};

module.exports.raging = function (req, res) {
    var requestOptions, fpath;
    if (req.params && req.params.depotid) {
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
            // depot ready, now time to get the products
            requestOptions['url'] = apiOptions.server + '/api/products';
            request(requestOptions, function (er, response_product, body_product) {
                if (er) {
                    console.log(er);
                } else {
                    console.log("EZZ\n\n\n\n" + body_product);
                    res.render('pages/depot_rage', {
                        title: 'Depot detail',
                        depot: body,
                        products: body_product
                    });
                }
            })

        } else {
            console.log(response);
            res.status(response.statusCode);
            res.json(response.body);
        }
    });
}

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
            body.forEach(element => {
                console.log(element);
            });
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

module.exports.depot_detail = function (req, res) {
    var requestOptions, fpath;
    if (req.params && req.params.depotid) {
        fpath = '/api/depots/' + req.params.depotid;
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
}


module.exports.add_module_post = function (req, res) {
    if (req.params && req.params.depotid) {
        // GET the products to let the user choose 
        var requestOptions, fpath;
        fpath = '/api/depots/' + req.params.depotid + '/products';
        console.log(req.body);
        let request_data = {
            productid: req.body.productid,
            amount: req.body.amount
        }
        requestOptions = {
            url: apiOptions.server + fpath, // you know why it's required
            method: 'POST', // default is get, 
            json: request_data, // good practice, and ensures that i get json back -> no, it gives back plain string, not json if i dont use it lma
        };
        request(requestOptions, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                console.log(response.status);
                console.log(body);
                res.redirect('/depots/' + req.params.depotid);
            }
        });

    }
};

module.exports.create_product_get = function (req, res) {
    if (req.params && req.params.depotid) {
        // GET the products to let the user choose 
        var requestOptions, fpath;
        fpath = '/api/products';

        requestOptions = {
            url: apiOptions.server + fpath, // you know why it's required
            method: 'GET', // default is get, 
            json: {}, // good practice, and ensures that i get json back -> no, it gives back plain string, not json if i dont use it lma
        };
        request(requestOptions, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                console.log(response);
                console.log(body);
                res.render('pages/add_product_to_object', {
                    title: "Create Depot",
                    products: body
                });
            }
        });
    } else {
        console.log('Depotid not set ');
    }

}

module.exports.create_depot = function (req, res) {
    res.render('pages/depot_form', {
        title: "Create Depot",
        depot:{
            name:"",
            place:""
        }
    });
}

module.exports.create_depot_post = function (req, res) {
    // get the data for request
    console.log(req.body);
    if (req.body.name && req.body.place) {
        var requestOptions, fpath;
        fpath = '/api/depots';
        requestOptions = {
            url: apiOptions.server + fpath, // you know why it's required
            method: 'POST', // default is get, 
            json: {
                name: req.body.name,
                place: req.body.place
            }, // good practice, and ensures that i get json back -> no, it gives back plain string, not json if i dont use it lmao
        };
        request(requestOptions, function (err, resp, body) {
            if (err) {
                res.render('error', {
                    error: err
                });
            } else {
                console.log(resp);
                console.log(body);
                res.redirect('/depots/');
            }
        })
    } else {
        res.render('error', {
            error: "Req.body.name and req.body.place is not defined"
        });
    }
};

exports.depot_delete = (req, res) => {
    var requestOptions, fpath, postData;
    if (req.params.depotid) {
        fpath = '/api/depots/' + req.params.depotid;
        requestOptions = {
            url: apiOptions.server + fpath,
            method: 'DELETE',
            json: {}
        };
        request(requestOptions, function (err, response, body) {
            if (err) {
                res.render('error', err);
            } else if (response.statusCode === 204) {
                res.redirect('/depots');
            } else {
                res.render('error', {
                    "message": "this is america",
                    "error": "error"
                });
            }
        });
    } else {
        res.render('error', {
            "message": "we are here found",
            "error": "error"
        });
    }
}

module.exports.depot_edit_product_post = function (req, res) {
    var requestOptions, fpath;
    if (req.params.depotid && req.params.productid) {
        fpath = '/api/depots/' + req.params.depotid + '/products';
        let data_request = {
            productid: req.params.productid,
            amount: req.body.amount
        }
        requestOptions = {
            url: apiOptions.server + fpath,
            method: 'PUT',
            json: data_request
        };
        request(requestOptions, function(err,response, body){
            if(err){
                console.log(err);
            } else{
                console.log(response.status);
                console.log(body);
                res.redirect('/depots/'+req.params.depotid);
            }
        });
    }
}

module.exports.depot_edit_product = function (req, res) {
    var requestOptions, fpath;
    if (req.params && req.params.depotid && req.params.productid) {
        fpath = '/api/depots/' + req.params.depotid;
        requestOptions = {
            url: apiOptions.server + fpath,
            method: 'GET',
            json: {}
        };
        request(requestOptions, function(err,response,body){
            if(err){
                console.log(err);
            } else {
                console.log(response);
                console.log(body);
                console.log(body.product_list.find(x => x.product._id == req.params.productid));
                res.render('pages/amount_form',{toupdate:body.product_list.find(x => x.product._id == req.params.productid)});
            }
        });
        
        
    } else {
        console.log('No');
    }
};

module.exports.depot_delete_product_post = function (req, res) {
    var requestOptions, fpath;
    if (req.params.depotid && req.params.productid) {
        fpath = '/api/depots/' + req.params.depotid + '/products/'+ req.params.productid;
        requestOptions = {
            url: apiOptions.server + fpath,
            method: 'DELETE',
            json: {}
        };
        request(requestOptions, function(err,response, body){
            if(err){
                console.log(err);
            } else{
                console.log(response.status);
                console.log(body);
                res.redirect('/depots/'+ req.params.depotid);
            }
        });
    }
},

/*
Find the to be deleted product_id from all depots and remove them
*/
module.exports.filter_deleted = function(req,res,next){
    if(req.params && req.params.productid){
        var requestOptions, fpath;
        fpath = '/api/depots/';
        requestOptions = {
            url: apiOptions.server + fpath,
            method: 'GET',
            json: {}
        };
        request(requestOptions, function(err,response,body){
            if(err){
                console.log(err);
            } else {
                console.log(response.statusCode);
                console.log(body);
                body.forEach(element => {
                    
                    fpath = '/api/depots/' + element._id + '/products/'+ req.params.productid;
                    requestOptions = {
                        url: apiOptions.server + fpath,
                        method: 'DELETE',
                        json: {}
                    };
                    request(requestOptions, function(error_delete, response_delete, body_delete){
                        if(err){
                            console.log(err)
                        } else {
                            console.log(response_delete);
                            console.log(body_delete);
                        }
                    });
                });
            }
        });
    }
    next();
}

module.exports.depot_edit_get = (req,res,next) => {
    if(req.params && req.params.depotid){
        var requestOptions, fpath;
        fpath = '/api/depots/' + req.params.depotid;
        requestOptions = {
            url: apiOptions.server + fpath,
            method: 'GET',
            json: {}
        };
    }
    request(requestOptions, function(err, response, body){
        console.log(body);
        res.render('pages/depot_form', {
            title: "Create Depot",
            depot: body
        });
    })

}

module.exports.depot_edit_post = (req,res,next) => {
    if(req.params && req.params.depotid){
        var requestOptions,fpath;
        fpath = '/api/depots/' + req.params.depotid;
        requestOptions = {
            url: apiOptions.server + fpath,
            method: 'PUT',
            json: {
                name: req.body.name,
                place: req.body.place
            }
        }
        request(requestOptions, function(err,response, body ){
            if(err){
                console.log(err);
                next();
            } else {
                console.log(response);
                console.log(body);
                res.redirect('/depots/'+req.params.depotid);
            }
        });


    } else {
        res.render('error', {title:"error",message:"Depotid not found"});
    }
}