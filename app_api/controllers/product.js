var utillib = require("./util");

var mongoose = require("mongoose");

var Product = mongoose.model("Product");


module.exports.send_json = function (req, res, ) {
  res.status(res.tpl.status);
  res.json(res.tpl.content);
}


module.exports.prod_list = function (req, res, next) {
  Product
    .find()
    .exec(function (err, products) {
      if (err) {
        res.tpl.status = 404;
        res.tpl.content = err;
        return next();
      }
        res.tpl.status = 200;
        res.tpl.content = products;
        res.tpl.products = products;
        return next();
    });
};


module.exports.product_detail = function (req, res, next) {
  if (req.params && req.params.productid) {
    Product.findById(req.params.productid).exec(function (err, product) {
      if (!product) {
        res.tpl.status = 404;
        res.tpl.content = {
          message: "Product not found"
        };
        return next();
      } else if (err) {
        res.tpl.status = 404;
        res.tpl.content = err;
        return next();
      }
      res.tpl.status = 200;
      res.tpl.content = product;
      res.tpl.product = product;
      return next()
    });
  } else {
    res.tpl.status = 404;
    res.tpl.content = {
      message: "No product id in request"
    };
    return next();
  }
};


module.exports.product_delete_get = function (req, res, next) {
  if (req.params.productid) {
    Product.findByIdAndRemove(req.params.productid).exec(function (err) {
      if (err) {
        res.tpl.status = 404;
        res.tpl.content = err;
        return next();
      }
      res.tpl.status = 204;
      res.tpl.content = {};
      return next();

    });
  } else {
    return next();
  }
};


module.exports.product_update_get = function (req, res, next) {
  var product = undefined;
  if (res.tpl.product) {
    product = res.tpl.product;
  } else {
    product = new Product();
  }
  product.name = req.body.name;
  product.product_id = req.body.product_id;
  product.price = req.body.price;
  product.imagefilenames = req.body.imagefilenames;
  product.amount = req.body.amount;
  product.description = req.body.description;
  product.save(function (err, product) {
    if (err) {
      res.tpl.status = 300;
      res.tpl.content = err;
      return next();
      // removed else 
    }
    res.tpl.status = 200;
    res.tpl.content = product;
    return next();
  });
};