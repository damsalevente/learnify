var utillib = require('./util');
var mongoose = require('mongoose');
var Depot = mongoose.model('Depot');

exports.depot_list = function (req, res) {
    Depot.find()
        .populate('product_list.product')
        .exec(function (err, depotlist) {
            if (err) {
                utillib.sendJsonResponse(res, 404, err);
            } else {
                utillib.sendJsonResponse(res, 200, depotlist);
            }
        });
};

exports.depot_detail = function (req, res) {
    if (req.params && req.params.depotid) {
        Depot.findById(req.params.depotid)
            .populate('product_list.product')
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    utillib.sendJsonResponse(res, 200, depot);
                }
            });
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Depot not found"
        });
    }
};

exports.depot_create_get = function (req, res) {
    Depot
        .create({
            name: req.body.name,
            place: req.body.place,
            //product_list: req.body.product_list,
            last_check_date: req.body.last_check_date,
        }, function (err, depot) {
            if (err) {
                utillib.sendJsonResponse(res, 300, err);
            } else {
                utillib.sendJsonResponse(res, 201, depot);
            }
        });
};
exports.depot_add_product = function (req, res) {
    if (req.params && req.params.depotid) {
        Depot
            .findById(req.params.depotid)
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 300, err);
                } else {
                    var found = [];
                    if(depot.product_list){
                        found = depot.product_list.filter(x => x.product == req.body.productid);
                    }
                    if(found.length === 0){
                        depot.product_list.push({product: req.body.productid, amount: req.body.amount});
                        depot.save(function (err, depot) {
                            if (err) {
                                utillib.sendJsonResponse(res, 300, err);
                            } else {
                                utillib.sendJsonResponse(res, 200, depot);
                            }
                        });
                       } else {
                        utillib.sendJsonResponse(res,300,{"message":"Már van ilyen"});

                       }
                }
            });
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Depot not found"
        });
    }

};
// The body contains a product id and amount, this funtions finds and updates it in the product_list array
exports.depot_change_product_amount = function (req, res) {
    if (req.params && req.params.depotid && req.body.productid && req.body.amount) {
        Depot.findById(req.params.depotid).exec(function (err, depot) {
            if (err) {
                utillib.sendJsonResponse(res, 300, err);
            } else {

                var prod_index = depot.product_list.findIndex(x => x.product === req.body.productid)
                depot.product_list[prod_index]['amount'] = req.body.amount;
                depot.save(function (err, saved_content) {
                    if (err) {
                        utillib.sendJsonResponse(res, 300, err);
                    } else {
                        utillib.sendJsonResponse(res, 200, saved_content);
                    }
                });
            }
        });
    }
}
exports.depot_delete_product = function (req, res) {
    if (req.params && req.params.depotid && req.params.product_id) {
        Depot
            .findById(req.params.depotid)
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 300, err);
                } else {
                    depot.product_list.pull({product: req.params.product_id});
                    depot.save(function (err, depot) {
                        if (err) {
                            utillib.sendJsonResponse(res, 300, err);

                        } else {
                            utillib.sendJsonResponse(res, 204, {
                                "message": "ok"
                            });
                        }
                    });
                }
            });
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Either the params not found or the product id is invalid"
        });
    }
};


exports.depot_delete_get = function (req, res) {
    if (req.params.depotid) {
        Depot
            .findByIdAndRemove(req.params.depotid)
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    utillib.sendJsonResponse(res, 204, depot);
                }
            });

    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Depot not found"
        });
    }
};


exports.depot_update_amount = function (req, res) {
    if (req.params.depotid) {
        Depot
            .findById(req.params.depotid)
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    var product_index = depot.product_list.findIndex(x => req.body.productid == x.product._id );
                    if (product_index === -1) {
                        utillib.sendJsonResponse(res, 404, {
                            'message': 'product not found in list'
                        });
                    } else {
                        depot.product_list[product_index]['amount'] = req.body.amount;

                        depot.save(function (err, dep) {
                            if (err) {
                                utillib.sendJsonResponse(res, 404, err);
                            } else {
                                utillib.sendJsonResponse(res, 200, dep);
                            }
                        });
                    }
                }
            });
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Partner not found"
        });
    }
};

exports.depot_update_get = function (req, res) {
    if (req.params.depotid) {
        Depot
            .findByIdAndUpdate(req.params.depotid)
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    depot.name = req.body.name;
                    depot.place = req.body.place;
                    //depot.product_list = req.body.product_list;
                    depot.last_check_date = req.body.last_check_date;
                    depot.save(function (err, dep) {
                        if (err) {
                            utillib.sendJsonResponse(res, 404, err);
                        } else {
                            utillib.sendJsonResponse(res, 200, dep);
                        }
                    });
                }
            });
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Partner not found"
        });
    }
};