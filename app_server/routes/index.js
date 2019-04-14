var express = require('express');
var path = require('path');
var router = express.Router();
var control_partner = require('../controllers/partner');
var controlUser = require('../controllers/users');
var controlCourseItem = require('../controllers/courseItem');
var control_product = require('../controllers/product');
var control_depot = require('../controllers/depot');
var control_order = require('../controllers/order');
var util = require('../controllers/util');


/* User pages */
router.get('/users',controlUser.userList);
router.get('/user', controlUser.userDetail);

// Product pages 
router.get('/products', control_product.homelist, control_product.apicall,control_product.statistics, control_product.renderpage('pages/products'));
router.get('/products/load', control_product.load_from_file);

router.get('/products/:productid',control_product.product_detail, util.apicall, util.renderpage('pages/product'));
router.get('/product/new',control_product.add_product);
router.post('/product/new',control_product.do_add_product,util.apicall, util.redirectTo('/products/'));
router.get('/products/:productid/edit', control_product.edit_product);
router.post('/products/:productid/edit',control_product.do_edit_product);
router.get('/products/:productid/delete',control_depot.filter_deleted, control_product.delete_product);
/* Partner pages */

router.get('/partners',control_partner.homelist);
router.get('/partners/:partnerid',control_partner.product_detail);
router.get('/partner/new',control_partner.add_product);
router.post('/partner/new',control_partner.do_add_product);
router.get('/partners/:partnerid/edit', control_partner.edit_product);
router.post('/partners/:partnerid/edit',control_partner.do_edit_product);
router.get('/partners/:partnerid/delete', control_partner.delete_product);

/* Depot pages */
router.get('/depots',control_depot.homelist);
router.get('/depots/:depotid',control_depot.depot_detail);
router.get('/depots/:depotid/product/new', control_depot.create_product_get);

router.post('/depots/:depotid/product/new', control_depot.add_module_post)
router.get('/depot/new', control_depot.create_depot);
router.post('/depot/new',control_depot.create_depot_post);
router.get('/depots/:depotid/delete', control_depot.depot_delete);
router.get('/depots/:depotid/edit', control_depot.depot_edit_get);
router.post('/depots/:depotid/edit', control_depot.depot_edit_post);

router.get('/depots/:depotid/products/:productid/edit', control_depot.depot_edit_product);
router.post('/depots/:depotid/products/:productid/edit', control_depot.depot_edit_product_post);
router.get('/depots/:depotid/products/:productid/delete', control_depot.depot_delete_product_post);

//router.post('/depots/:depotid/products/:productid')
//router.get('/depot/new',control_depot.add_depot);
//router.post('depot/new',control_depot.do_add_depot);
//router.get('/depot/:depotid/edit', control_depot.edit_depot);
//router.post('depot/:depotid/edit',control_depot.do_edit_depot);
//router.get('/depot/:depotid/delete', control_depot.delete_depot);
router.get('/depots/:depotid/producttest', control_depot.raging);


/* Order */
router.get('/orders', control_order.homelist);
router.get('/orders/:orderid', control_order.order_detail);
router.get('/orders/:orderid/product/new', control_order.create_product_get)

router.post('/orders/:orderid/product/new', control_order.add_module_post)
router.get('/order/new', control_order.create_order);
router.post('/order/new',control_order.create_order_post);
router.get('/orders/:orderid/delete', control_order.order_delete);
router.get('/orders/:orderid/products/:productid/edit', control_order.order_edit_product);
router.post('/orders/:orderid/products/:productid/edit', control_order.order_edit_product_post);
router.get('/orders/:orderid/products/:productid/delete', control_order.order_delete_product_post);
router.get('/orders/:orderid/edit',control_order.order_edit);
router.post('/orders/:orderid/edit', control_order.order_edit_post);

module.exports = router;
