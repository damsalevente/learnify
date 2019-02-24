var utillib = require('./util');
var mongoose = require('mongoose');
var Depot = mongoose.model('Depot');

exports.depot_list = function (req, res) {
    Depot.find().exec(function (err, depotlist) {
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
            .populate('product_list')
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    utillib.sendJsonResponse(res, 200, depot);
                }
            })
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
            product_list: req.body.product_list,
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
                    depot.product_list.push(req.body.productid);
                    depot.save(function (err, depot) {
                        if (err) {
                            utillib.sendJsonResponse(res, 300, err);
                        } else {
                            utillib.sendJsonResponse(res, 200, depot);
                        }
                    })
                }
            })
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Depot not found"
        });
    }

};

exports.depot_delete_product = function (req, res) {
    if (req.params && req.params.depotid && req.body.product_id) {
        Depot
            .findById(req.params.depotid)
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 300, err);
                } else {
                    depot.product_list.pull(req.body.product_id);
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

exports.depot_create_post = function (req, res) {
    res.send('Not implemented');
};

exports.depot_delete_get = function (req, res) {
    if (req.params.depotid) {
        Partner
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
            "message": "Depot not found, you wanted to delete it anyways...."
        });
    }
};

exports.depot_delete_post = function (req, res) {
    res.send('Not implemented');
};

exports.depot_update_get = function (req, res) {
    if (req.params.depotid) {
        Partner
            .findByIdAndUpdate(req.params.depotid)
            .exec(function (err, depot) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    depot.name = req.body.name;
                    depot.place = req.body.place;
                    depot.product_list = req.body.product_list;
                    depot.last_check_date = req.body.last_check_date;
                    depot.save(function (err, partner) {
                        if (err) {
                            utillib.sendJsonResponse(res, 404, err);
                        } else {
                            utillib.sendJsonResponse(res, 200, partner);
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

exports.depot_update_post = function (req, res) {
    res.send('Not implemented');
};