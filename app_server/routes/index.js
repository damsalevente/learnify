var express = require('express');
var router = express.Router();
var controlmain = require('../controllers/main');
var controlCourse = require('../controllers/courses');
var controlUser = require('../controllers/users');
var controlCourseItem = require('../controllers/courseItem');

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


module.exports = router;
