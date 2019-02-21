var express = require('express');
var path = require('path');
var router = express.Router();
var controlmain = require('../controllers/main');
var controlCourse = require('../controllers/courses');
var controlUser = require('../controllers/users');
var controlCourseItem = require('../controllers/courseItem');
var control_product = require('../controllers/product');
/* Course pages */
router.get('/', controlCourse.homelist);
router.get('/course/:courseid',controlCourse.courseInfo);
router.get('/new',controlCourse.courseNew);
router.post('/new',controlCourse.courseDoNew);


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

module.exports = router;
