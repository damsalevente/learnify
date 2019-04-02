var express = require('express');
var router = express.Router();

var control_depot = require('../controllers/depot');
var control_product = require('../controllers/product');
var control_partner = require('../controllers/partner');
var control_order = require('../controllers/order');
var util = require('../controllers/util');

/* Get list get,post,put,delete element */
router.get('/depots', control_depot.depot_list);
router.get('/depots/:depotid', control_depot.depot_detail);
router.post('/depots', control_depot.depot_create_get);
router.put('/depots/:depotid', control_depot.depot_update_get);
router.put('/depots/:depotid/products', control_depot.depot_update_amount);
router.delete('/depots/:depotid', control_depot.depot_delete_get);
/* in that way, we will only use the product's id, and we push it to the ref array*/
router.post('/depots/:depotid/products', control_depot.depot_add_product);
router.delete('/depots/:depotid/products/:product_id', control_depot.depot_delete_product)


/* Products api */
router.get('/products', control_product.prod_list,
    control_product.send_json);
router.get('/products/:productid', control_product.product_detail,
    control_product.send_json);
router.post('/products', control_product.product_update_get, control_product.send_json);
router.put('/products/:productid', control_product.product_detail,
    control_product.product_update_get,
    control_product.send_json);
router.delete('/products/:productid', control_product.product_delete_get, control_product.send_json);

/* Partners api */
router.get('/partners', control_partner.partner_list, util.send_json);
router.get('/partners/:partnerid', control_partner.partner_detail, util.send_json);
router.post('/partners', control_partner.partner_update_get, util.send_json);
router.put('/partners/:partnerid', control_partner.partner_detail, control_partner.partner_update_get, util.send_json);
router.delete('/partners/:partnerid', control_partner.partner_delete_get);

/* Orders api */
router.get('/orders', control_order.order_list, util.send_json);
router.get('/orders/:orderid', control_order.order_detail, util.send_json);

router.post('/orders', control_order.order_detail, control_order.order_update_get, util.send_json);
router.put('/orders/:orderid', control_order.order_detail, control_order.order_update_get, util.send_json);
router.delete('/orders/:orderid', control_order.order_delete_get);


router.post('/orders/:orderid/products', control_order.order_detail, control_order.order_push_item, util.send_json);
router.put('/orders/:orderid/products/:productid', control_order.order_detail, control_order.order_update_post, util.send_json);
router.delete('/orders/:orderid/products/:productid', control_order.order_detail, control_product.product_detail, control_order.order_pull_item, util.send_json);

module.exports = router;
