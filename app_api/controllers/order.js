var utillib = require('./util');
var mongoose = require('mongoose');

var Order = mongoose.model('Order');
var Products = mongoose.model('Product');

exports.order_list = function (req, res, next) {
    Order
        .find()
        .populate('product_list.product')
        .populate('partner')
        .exec(function (err, order_list) {
            if (err) {
                res.tpl.status = 300;
                res.tpl.content = err;
                return next();
            }
            res.tpl.status = 200;
            res.tpl.content = order_list;
            res.tpl.orders = order_list;
            return next();
        });
};

exports.order_detail = function (req, res, next) {
    if (req.params && req.params.orderid) {
        Order.findById(req.params.orderid)
            .populate('product_list.product')
            .populate('partner')
            .exec(function (err, order) {
                if (err) {
                    res.tpl.status = 300;
                    res.tpl.content = err;
                    return next();
                }
                res.tpl.status = 200;
                res.tpl.content = order;
                res.tpl.order = order;
                return next();
            });

    } else {
        res.tpl.status = 404;
        res.tpl.content = {
            "message": "Order not found"
        }
        return next();
    }

};


exports.order_delete_get = function (req, res) {
    if (req.params && req.params.orderid) {
        Order.findByIdAndRemove(req.params.orderid).exec(function (err, order) {
            if (err) {
                utillib.sendJsonResponse(res, 300, err);
            } else {
                utillib.sendJsonResponse(res, 201, {});
            }
        })
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Order with id not found"
        });
    }
};

exports.order_update_get = function (req, res, next) {
    var order = undefined;
    if (res.tpl.order) {
        order = res.tpl.order;
    } else {
        order = new Order();
    }
    // todo : it should have some validation
    order.date = req.body.date;
    order.partner = req.body.partner;
    order.order_status = req.body.order_status;

    order.save(function (err, order) {
        if (err) {
            res.tpl.status = 300;
            res.tpl.content = err;
            return next();
        }
        res.tpl.status = 200;
        res.tpl.content = order;
        return next();
    });
};

exports.order_update_post = function (req, res, next) {
    if (req.params.productid && res.tpl.order) {
        var order = res.tpl.order;

        // find the product from the list
        var prod_index = order.product_list.findIndex(x => x.product._id == req.body.productid)
        // update the amount field 
        order.product_list[prod_index]['amount'] = req.body.amount;
        // save
        order.save(function (err, saved_content) {
            if (err) {
                res.tpl.status = 300;
                res.tpl.content = err;
                return next();
            }
            res.tpl.status = 200;
            res.tpl.content = saved_content;
            return next();
        });
    }
    res.tpl.status = 300;
    res.tpl.content = {
        message: ' Product id not specified or order not found'
    }
    return next();
};


// if i put productid from req.body to req.params, i can use the products middleware directly 
exports.order_push_item = function (req, res, next) {
    if (res.tpl.order) {
        var order = res.tpl.order;
        Products.findById(req.body.productid)
            .exec(function (err, product) {
                if (err) {
                    res.tpl.status = 300;
                    res.tpl.content = err;
                    return next();
                }
                var found = [];
                if (order.product_list) {
                    found = order.product_list.filter(x => x.product._id == req.body.productid);
                }
                if (found.length === 0) {
                    order.product_list.push({
                        product: product._id,
                        amount: req.body.amount
                    });

                    order.save();
                    res.tpl.status = 200;
                    res.tpl.content = order;
                    return next();
                } else {
                    res.tpl.status = 300;
                    res.tpl.content = {
                        "message": "Mรกr van ilyen"
                    };
                    return next();
                }

            });
    }
    res.tpl.status = 404;
    res.tpl.content = {
        message: 'Order with id not found '
    }
    return next();
}

// Order detail, Product detail 
exports.order_pull_item = function (req, res, next) {
    if (res.tpl.order && res.tpl.product) {
        var order = res.tpl.order;
        var product = res.tpl.product;
        order.product_list.pull({
            product: product._id
        });

        order.save();
        res.tpl.status = 200;
        res.tpl.content = {
            message: 'Element deleted'
        }
        return next();
    } else {
        res.tpl.status = 404;
        res.tpl.content = {
            message: 'Order with id not found'
        }
        return next();
    }
}

exports.order_update_amount = function (req, res) {
    if (req.params.orderid) {
        Order
            .findById(req.params.orderid)
            .exec(function (err, order) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    var product_index = order.product_list.findIndex(x => req.body.productid == x.product._id);
                    if (product_index === -1) {
                        utillib.sendJsonResponse(res, 404, {
                            'message': 'product not found in list'
                        });
                    } else {
                        order.product_list[product_index]['amount'] = req.body.amount;

                        order.save(function (err, dep) {
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

exports.order_delete_get = function (req, res) {
    if (req.params.orderid) {
        Order
            .findByIdAndRemove(req.params.orderid)
            .exec(function (err, order) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    utillib.sendJsonResponse(res, 204, order);
                }
            });

    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "order not found"
        });
    }
};