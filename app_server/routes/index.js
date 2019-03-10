var express = require('express');
var path = require('path');
var router = express.Router();
var controlmain = require('../controllers/main');
var control_partner = require('../controllers/partner');
var controlUser = require('../controllers/users');
var controlCourseItem = require('../controllers/courseItem');
var control_product = require('../controllers/product');
var control_depot = require('../controllers/depot');
/* Course pages */

/* Course item */
router.get('/course/item', controlCourseItem.item);

/* User pages */
router.get('/users',controlUser.userList);
router.get('/user', controlUser.userDetail);

// Product pages 
router.get('/products',control_product.homelist);
router.get('/products/:productid',control_product.product_detail);
router.get('/product/new',control_product.add_product);
router.post('/product/new',control_product.do_add_product);
router.get('/products/:productid/edit', control_product.edit_product);
router.post('/products/:productid/edit',control_product.do_edit_product);
router.get('/products/:productid/delete', control_product.delete_product);

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
router.get('/depots/:depotid/product/edit', control_depot.depot_edit_product);
router.post('/depots/:depotid/product/edit', control_depot.depot_edit_product_post);

//router.post('/depots/:depotid/products/:productid')
//router.get('/depot/new',control_depot.add_depot);
//router.post('depot/new',control_depot.do_add_depot);
//router.get('/depot/:depotid/edit', control_depot.edit_depot);
//router.post('depot/:depotid/edit',control_depot.do_edit_depot);
//router.get('/depot/:depotid/delete', control_depot.delete_depot);
router.get('/depots/:depotid/producttest', control_depot.raging);


module.exports = router;
