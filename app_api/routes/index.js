var express = require('express');
var router = express.Router();

var control_depot = require('../controllers/depot');
var control_product = require('../controllers/product');
var control_partner = require('../controllers/partner');
var control_order = require('../controllers/order');

/* Get list get,post,put,delete element */
router.get('/depots', control_depot.depot_list);
router.get('/depots/:depotid',control_depot.depot_detail);
router.post('/depots', control_depot.depot_create_get);
router.put('/depots/:depotid', control_depot.depot_update_get);
router.delete('/depots/:depotid', control_depot.depot_delete_get); 
/* in that way, we will only use the product's id, and we push it to the ref array
// idk if i want to create an endpoint for productid too, i feel like a link would be enough for the product list, but we 
will see */
router.post('/depots/:depotid/products', control_depot.depot_add_product);
router.delete('/depots/:depotid/products',control_depot.depot_delete_product)
/* Products api */
router.get('/products', control_product.prod_list);
router.get('/products/:productid',control_product.product_detail);
router.post('/products', control_product.product_create_get);
router.put('/products/:productid', control_product.product_update_get);
router.delete('/products/:productid', control_product.product_delete_get); 

/* Partners api */
router.get('/partners', control_partner.partner_list);
router.get('/partners/:partnerid',control_partner.partner_detail);
router.post('/partners', control_partner.partner_create_get);
router.put('/partners/:partnerid', control_partner.partner_update_get);
router.delete('/partners/:partnerid', control_partner.partner_delete_get); 

/* Orders api */
router.get('/orders', control_order.order_list);
router.get('/orders/:orderid',control_order.order_create_get);
router.post('/orders', control_order.order_create_get);
router.put('/orders/:orderid', control_order.order_update_get);
router.delete('/orders/:orderid', control_order.order_delete_get); 


module.exports = router;