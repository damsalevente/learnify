var utillib = require("./util");
var mongoose = require("mongoose");
var Depot = mongoose.model("Depot");

exports.depot_list = function(req, res, next) {
  Depot.find()
    .populate("product_list.product")
    .exec(function(err, depotlist) {
      if (err) {
        res.tpl.status = 404;
        res.tpl.content = err;
        return next();
      } else {
        res.tpl.status = 200;
        res.tpl.content = depotlist;
        res.tpl.depotlist = depotlist;
        return next();
      }
    });
};

exports.depot_detail = function(req, res, next) {
  if (req.params && req.params.depotid) {
    Depot.findById(req.params.depotid)
      .populate("product_list.product")
      .exec(function(err, depot) {
        if (err) {
          res.tpl.status = 300;
          res.tpl.content = err;
          return next();
        } else {
          res.tpl.status = 200;
          console.log("Ide befutott");
          console.log(depot);
          res.tpl.content = depot;
          res.tpl.depot = depot;
          return next();
        }
      });
  } else {
    res.tpl.status = 404;
    res.tpl.content = { message: "Depot not found" };
    return next();
  }
};

exports.depot_create_get = function(req, res) {
  Depot.create(
    {
      name: req.body.name,
      place: req.body.place,
      //product_list: req.body.product_list,
      last_check_date: req.body.last_check_date
    },
    function(err, depot) {
      if (err) {
        utillib.sendJsonResponse(res, 300, err);
      } else {
        utillib.sendJsonResponse(res, 201, depot);
      }
    }
  );
};
exports.depot_add_product = function(req, res, next) {
  // call depot detail and get res.tpl.depot
  if (req.body.productid && req.body.amount) {
    var depot = res.tpl.depot;
    var found = [];
    if (depot.product_list) {
      found = depot.product_list.filter(x => x.product == req.body.productid);
      if (found.length === 0) {
        depot.product_list.push({
          product: req.body.productid,
          amount: req.body.amount
        });
        depot.save(function(err, depot) {
          if (err) {
            res.tpl.status = 300;
            res.tpl.content = err;
            return next();
          } else {
            res.tpl.status = 200;
            res.tpl.content = depot;
            return next();
          }
        });
      } else {
        res.tpl.status = 300;
        res.tpl.content = { message: "Already exists" };
        return next();
      }
    } else {
      res.tpl.status = 300;
      res.tpl.content = { message: "Please set product id and amount " };
    }
  }
};
// The body contains a product id and amount, this funtions finds and updates it in the product_list array
exports.depot_change_product_amount = function(req, res) {
  if (
    req.params &&
    req.params.depotid &&
    req.body.productid &&
    req.body.amount
  ) {
    Depot.findById(req.params.depotid).exec(function(err, depot) {
      if (err) {
        utillib.sendJsonResponse(res, 300, err);
      } else {
        var prod_index = depot.product_list.findIndex(
          x => x.product === req.body.productid
        );
        depot.product_list[prod_index]["amount"] = req.body.amount;
        depot.save(function(err, saved_content) {
          if (err) {
            utillib.sendJsonResponse(res, 300, err);
          } else {
            utillib.sendJsonResponse(res, 200, saved_content);
          }
        });
      }
    });
  }
};
// i could use product detail to get the id-> should do it
exports.depot_delete_product = function(req, res, next) {
  if (req.params && req.params.product_id) {
    var depot = res.tpl.depot;
    depot.product_list.pull({ product: req.params.product_id });
    depot.save(function(err, depot) {
      if (err) {
        res.tpl.status = 300;
        res.tpl.content = err;
        return next();
      } else {
        res.tpl.status = 204;
        res.tpl.content = {
          message: "ok"
        };
        return next();
      }
    });
  } else {
    res.status = 404;
    res.tpl.content = {
      message: "Either the params not found or the product id is invalid"
    };
    return next();
  }
};

exports.depot_delete_get = function(req, res, next) {
  res.tpl.depot.remove(function(err) {
    if (err) {
      res.tpl.status = 300;
      res.tpl.content = err;
      return next();
    } else {
      res.tpl.status = 201;
      res.tpl.content = {};
      return next();
    }
  });
};

exports.depot_update_amount = function(req, res, next) {
  if (req.body.amount) {
    var depot = res.tpl.depot;
    var product_index = depot.product_list.findIndex(
      x => req.body.productid == x.product._id
    );
    if (product_index === -1) {
      res.tpl.status = 404;
      res.tpl.content = { message: "product not found in list" };
      return next();
    } else {
      depot.product_list[product_index]["amount"] = req.body.amount;

      depot.save(function(err, dep) {
        if (err) {
          res.tpl.status = 404;
          res.tpl.content = err;
          return next();
        } else {
          res.tpl.status = 200;
          res.tpl.content = dep;
          return next();
        }
      });
    }
  } else {
    // amount not set
    res.status = 404;
    res.content = { message: "amount not valid or not set" };
    return next();
  }
};

exports.depot_update_get = function(req, res, next) {
  var depot = undefined;
  // maybe check res.tpl has depot key
  if (res.tpl.depot) {
    depot = res.tpl.depot;
  } else {
    depot = new Depot();
  }
  depot.name = req.body.name;
  depot.place = req.body.place;
  depot.last_check_date = req.body.last_check_date;
  depot.save(function(err, dep) {
    if (err) {
      res.tpl.status = 404;
      res.tpl.content = err;
      return next();
    } else {
      res.tpl.status = 200;
      res.tpl.content = dep;
      return next();
    }
  });
};
