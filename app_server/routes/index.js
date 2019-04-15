var express = require('express');
var path = require('path');
var router = express.Router();
var control_partner = require('../controllers/partner');
var controlCourseItem = require('../controllers/courseItem');
var control_product = require('../controllers/product');
var control_depot = require('../controllers/depot');
var control_order = require('../controllers/order');
var util = require('../controllers/util');
// todo: put it into app_servre or make it the same as the others( request())
var control_user = require('../controllers/users');

// Product pages 
router.get('/', control_product.homelist, control_product.apicall, control_product.statistics, control_product.renderpage('pages/products'));
router.get('/products',control_product.homelist, control_product.apicall, control_product.statistics, control_product.renderpage('pages/products'));
router.get('/products/load',util.auth, control_product.load_from_file);

router.get('/products/:productid',util.auth, control_product.product_detail, util.apicall, util.renderpage('pages/product'));
router.get('/product/new',util.auth, control_product.add_product);
router.post('/product/new',util.auth, control_product.do_add_product, util.apicall, util.redirectTo('/products/'));
router.get('/products/:productid/edit',util.auth, control_product.edit_product);
router.post('/products/:productid/edit',util.auth, control_product.do_edit_product);
router.get('/products/:productid/delete',util.auth, control_depot.filter_deleted, control_product.delete_product);
/* Partner pages */

router.get('/partners',util.auth, control_partner.homelist);
router.get('/partners/:partnerid',util.auth, control_partner.product_detail);
router.get('/partner/new',util.auth, control_partner.add_product);
router.post('/partner/new',util.auth, control_partner.do_add_product);
router.get('/partners/:partnerid/edit',util.auth, control_partner.edit_product);
router.post('/partners/:partnerid/edit',util.auth, control_partner.do_edit_product);
router.get('/partners/:partnerid/delete',util.auth, control_partner.delete_product);

/* Depot pages */
router.get('/depots',util.auth, control_depot.homelist);
router.get('/depots/:depotid',util.auth, control_depot.depot_detail);
router.get('/depots/:depotid/product/new',util.auth, control_depot.create_product_get);

router.post('/depots/:depotid/product/new',util.auth, control_depot.add_module_post)
router.get('/depot/new',util.auth, control_depot.create_depot);
router.post('/depot/new',util.auth, control_depot.create_depot_post);
router.get('/depots/:depotid/delete',util.auth, control_depot.depot_delete);
router.get('/depots/:depotid/edit',util.auth, control_depot.depot_edit_get);
router.post('/depots/:depotid/edit',util.auth, control_depot.depot_edit_post);

router.get('/depots/:depotid/products/:productid/edit',util.auth, control_depot.depot_edit_product);
router.post('/depots/:depotid/products/:productid/edit',util.auth, control_depot.depot_edit_product_post);
router.get('/depots/:depotid/products/:productid/delete',util.auth, control_depot.depot_delete_product_post);

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
router.get('/orders/:orderid/product/new',util.auth, control_order.create_product_get)

router.post('/orders/:orderid/product/new',util.auth, control_order.add_module_post)
router.get('/order/new',util.auth, control_order.create_order);
router.post('/order/new',util.auth, control_order.create_order_post);
router.get('/orders/:orderid/delete',util.auth, control_order.order_delete);
router.get('/orders/:orderid/products/:productid/edit',util.auth, control_order.order_edit_product);
router.post('/orders/:orderid/products/:productid/edit',util.auth, control_order.order_edit_product_post);
router.get('/orders/:orderid/products/:productid/delete',util.auth, control_order.order_delete_product_post);
router.get('/orders/:orderid/edit',util.auth, control_order.order_edit);
router.post('/orders/:orderid/edit',util.auth, control_order.order_edit_post);

router.get('/login',
    util.renderpage('pages/login')
);
router.post('/login',
    util.inv_auth,
    control_user.check_user);

router.get('/logout',
    util.logout,
    function (req, res, next) {
        res.redirect('/');
    }
);
router.get('/register',
util.renderpage('pages/register'));
router.post('/register',
    util.inv_auth,
    control_user.register,
    util.renderpage('pages/register')
);

module.exports = router;
