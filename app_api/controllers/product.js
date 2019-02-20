var utillib = require("./util");

var mongoose = require("mongoose");

var Product = mongoose.model("Product");

module.exports.prod_list = function (req, res) {
  Product
    .find()
    .exec(function (err, products) {
      if (err) {
        utillib.sendJsonResponse(res, 400, err);
      } else {
        utillib.sendJsonResponse(res, 200, products);
      }
    })
};

module.exports.product_detail = function (req, res) {
  if (req.params && req.params.productid) {
    Product.findById(req.params.productid).exec(function (err, product) {
      if (!product) {
        utillib.sendJsonResponse(res, 404, {
          message: "Product not found"
        });
      } else if (err) {
        utillib.sendJsonResponse(res, 404, err);
        return;
      }
      utillib.sendJsonResponse(res, 200, product);
    });
  } else {
    utillib.sendJsonResponse(res, 404, {
      message: "No product id in request"
    });
  }
};

module.exports.product_create_get = function (req, res) {
  Product.create({
    name: req.body.name,
    product_id: req.body.product_id,
    price: req.body.price,
    imagefilenames: req.body.imagefilenames,
    amount: req.body.amount,
    description: req.body.description,
  }, function (err, product) {
    if (err) {
      utillib.sendJsonResponse(res, 400, err);
    } else {
      utillib.sendJsonResponse(res, 201, product);
    }
  });
};

module.exports.product_create_post = function (req, res) {
  utillib.sendJsonResponse(res, 200, {
    message: "get prod list"
  });
};

module.exports.product_delete_get = function (req, res) {
  var productid = req.params.productid;
  console.log(productid);
  if (productid) {
    Product.findByIdAndRemove(productid).exec(function (err, product) {
      if (err) {
        utillib.sendJsonResponse(res, 404, err);

      } else {
        utillib.sendJsonResponse(res, 204, product);
      }
    });
  } else {
    utillib.sendJsonResponse(res, 404, {
      "message": "Tried to delete a nonexistent product"
    });

  }
};

module.exports.product_delete_post = function (req, res) {
  utillib.sendJsonResponse(res, 200, {
    message: "get prod list"
  });
};

module.exports.product_update_get = function (req, res) {
    var productid = req.params.productid;
    if (productid) {
      // get the product
      Product
        .findByIdAndUpdate(productid)
        .exec(function (err, product) {
            product.name = req.body.name;
            product.product_id = req.body.product_id;
            product.price = req.body.price;
            product.price = req.body.price;
            product.imagefilenames = req.body.imagefilenames;
            product.amount = req.body.amount;
            product.description = req.body.description;

            product.save(function (err, product) {
                if (err) {
                  utillib.sendJsonResponse(res, 404, err);
                } else {
                  utillib.sendJsonResponse(res,200,product);
                }
              })
        });
      }
      else {
        // not found item
        utillib.sendJsonResponse(res,404,{"Message": "Product not found"});
      }
    };

    module.exports.product_update_post = function (req, res) {
      utillib.sendJsonResponse(res, 200, {
        message: "get prod list"
      });
    };