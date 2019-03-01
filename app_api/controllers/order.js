var utillib = require('./util');
var mongoose = require('mongoose');

var Order = mongoose.model('Order');
var Products = mongoose.model('Product');

exports.order_list = function (req, res) {
    Order
        .find()
        .populate('product_list.product')
        .exec(function (err, order_list) {
            if (err) {
                utillib.sendJsonResponse(res, 300, err);
            } else {
                utillib.sendJsonResponse(res, 200, order_list);
            }
        });
};

exports.order_detail = function (req, res) {
    if (req.params && req.params.orderid) {
        Order.findById(req.params.orderid)
            .exec(function (err, order) {
                if (err) {
                    utillib.sendJsonResponse(res, 300, err);
                } else {
                    utillib.sendJsonResponse(res, 200, order);
                }
            });

    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Order not found"
        });
    }

};
exports.order_create_get = function (req, res) {
    Order.create({
        date: req.body.date,
        partner: req.body.partner,  // selected partner id
        order_status: req.body.order_status,
        //product_list: req.body.product_list,
    }, function (err, order) {
        if (err) {
            utillib.sendJsonResponse(res, 300, err);
        } else {
            utillib.sendJsonResponse(res, 200, order);
        }
    });
};

exports.order_create_post = function (req, res) {
    res.send("Not implemented");
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

exports.order_delete_post = function (req, res) {
    res.send('Not implemented');
};

exports.order_update_get = function (req, res) {
   if(req.params && req.params.orderid){
       Order
        .findByIdAndUpdate(req.params.orderid)
        .exec(function(err,order){
            if(err){
                utillib.sendJsonResponse(res,300,err);
            } else {
                // todo : it should have some validation
                order.date = req.body.date;
                order.partner = req.body.partner;
                order.order_status = req.body.order_status;
                order.product_list = req.body.product_list;
                order.save(function(err,order){
                    if(err){
                        utillib.sendJsonResponse(res,300,err);
                    } else {
                        utillib.sendJsonResponse(res,204, order);
                    }
                });
                
            }
        });
   } else {
       utillib.sendJsonResponse(res,404,{
           "message": "Order not found",
       });
   }
};

exports.order_update_post = function (req, res) {
    res.send('Not implemented');
};

exports.order_push_item = function(req,res){
    console.log('ide befut?');
    if(req.params && req.params.orderid){
        Order.findById(req.params.orderid).exec(function(err,order){
            if(err){
                utillib.sendJsonResponse(res,300,err);
            } else{
                Products.findById(req.body.productid)
                    .exec(function(err,product){
                        if(err){
                            utillib.sendJsonResponse(res,300,err);

                        }else if(product === null){
                            utillib.sendJsonResponse(res,404,'product not found');
                        } else{
                            order.product_list.push({product: product._id, amount:req.body.amount});
                            console.log(order);
                            console.log(product._id);
                            console.log(req.body.amount);
                           
                            order.save();
                            utillib.sendJsonResponse(res,200,order);
                        }
                    });
            }
        });
    } else {
        utillib.sendJsonResponse(res,404,{
            "message":"Order with id not found"
        });
    }
}

exports.order_pull_item = function(req,res){
    console.log('ide befut?');
    if(req.params && req.params.orderid && req.params.productid){
        Order.findById(req.params.orderid).exec(function(err,order){
            if(err){
                utillib.sendJsonResponse(res,300,err);
            } else{

                Products.findById(req.params.productid)
                    .exec(function(err,product){
                        if(err){
                            utillib.sendJsonResponse(res,300,err);

                        }else if(product === null){
                            utillib.sendJsonResponse(res,404,'product not found');
                        } else{
                            order.product_list.pull({ product: product._id});
                            console.log(order);
                            console.log(product._id);
                            console.log(req.body.amount);
                           
                            order.save();
                            utillib.sendJsonResponse(res,200,{"message":"Element deleted"});
                        }
                    });
            }
        });
    } else {
        utillib.sendJsonResponse(res,404,{
            "message":"Order with id not found"
        });
    }
}