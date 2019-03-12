var request = require('request');
var multer = require('multer');
var path = require('path');

var apiOptions = {
    server: 'http://localhost:3000'
};

module.exports.raging = function (req, res) {
    var requestOptions, fpath;
    if (req.params && req.params.orderid) {
        fpath = '/api/orders/' + req.params.orderid;

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
            // order ready, now time to get the products
            requestOptions['url'] = apiOptions.server + '/api/products';
            request(requestOptions, function (er, response_product, body_product) {
                if (er) {
                    console.log(er);
                } else {
                    console.log("EZZ\n\n\n\n" + body_product);
                    res.render('pages/order_rage', {
                        title: 'order detail',
                        order: body,
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
    fpath = '/api/orders';
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

            res.render('pages/orders', {
                title: 'order list',
                orderlist: body,
            });
        } else {
            res.status(response.statusCode);
            res.json(response.body);
        }
    });

};

module.exports.order_detail = function (req, res) {
    var requestOptions, fpath;
    if (req.params && req.params.orderid) {
        fpath = '/api/orders/' + req.params.orderid;
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
                res.render('pages/order_detail', {
                    title: 'order detail',
                    order: body,
                });
            } else {
                console.log('This is it ')
                console.log(response);
                res.status(response.statusCode);
                res.json(response.body);
            }
        });
    }
}


module.exports.add_module_post = function (req, res) {
    if (req.params && req.params.orderid) {
        // GET the products to let the user choose 
        var requestOptions, fpath;
        fpath = '/api/orders/' + req.params.orderid + '/products';
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
                res.redirect('/orders/' + req.params.orderid);
            }
        });

    }
};

module.exports.create_product_get = function (req, res) {
    if (req.params && req.params.orderid) {
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
                    title: "Create order",
                    products: body
                });
            }
        });
    } else {
        console.log('orderid not set ');
    }

}

module.exports.create_order = function (req, res) {
    res.render('pages/order_form', {
        title: "Create order"
    });
}

module.exports.create_order_post = function (req, res) {
    // get the data for request
    console.log(req.body);
    if (req.body.order_status) {
        var requestOptions, fpath;
        fpath = '/api/orders';
        requestOptions = {
            url: apiOptions.server + fpath, // you know why it's required
            method: 'POST', // default is get, 
            json: {
                //date: req.body.date,
                order_status: req.body.order_status
            }, // good practice, and ensures that i get json back -> no, it gives back plain string, not json if i dont use it lmao
        };
        request(requestOptions, function (err, resp, body) {
            if (err) {
               console.log(err);
            } else {
                console.log(resp);
                res.redirect('/orders/');
            }
        })
    } else {
        res.render('error', {
            error: "Req.body.name and req.body.place is not defined"
        });
    }
};

exports.order_delete = (req, res) => {
    var requestOptions, fpath, postData;
    if (req.params.orderid) {
        fpath = '/api/orders/' + req.params.orderid;
        requestOptions = {
            url: apiOptions.server + fpath,
            method: 'DELETE',
            json: {}
        };
        request(requestOptions, function (err, response, body) {
            if (err) {
                res.render('error', err);
            } else if (response.statusCode === 204) {
                res.redirect('/orders');
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

module.exports.order_edit_product_post = function (req, res) {
    var requestOptions, fpath;
    if (req.params.orderid && req.params.productid) {
        fpath = '/api/orders/' + req.params.orderid + '/products/' + req.params.productid;
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
                res.redirect('/orders/'+req.params.orderid);
            }
        });
    } else {
        console.log('no');
    }
}

module.exports.order_edit_product = function (req, res) {
    var requestOptions, fpath;
    if (req.params && req.params.orderid && req.params.productid) {
        fpath = '/api/orders/' + req.params.orderid;
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

module.exports.order_delete_product_post = function (req, res) {
    var requestOptions, fpath;
    if (req.params.orderid && req.params.productid) {
        fpath = '/api/orders/' + req.params.orderid + '/products/'+ req.params.productid;
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
                res.redirect('/orders/'+ req.params.orderid);
            }
        });
    }
}