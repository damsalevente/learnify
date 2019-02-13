var express = require('express');
var router = express.Router();


var controlCourse = require('../controllers/courses');
var controlUser = require('../controllers/users');
var controlCourseItem = require('../controllers/courseItem');

/* Course pages */
router.get('/courses', controlCourse.courseList);
router.get('/courses/:courseid',controlCourse.courseOneElement);
router.post('/courses', controlCourse.courseCreate);
router.put('/courses/:courseid', controlCourse.courseUpdate);
router.delete('/course/:courseid', controlCourse.courseDelete); 

/* Course item */
router.post('/courses/:courseid/courseitem',controlCourseItem.courseCreateOne);
router.get('/courses/:courseid/courseitem', controlCourseItem.getCourseItemList);
router.get('/courses/:courseid/courseitem/:courseitemid',controlCourseItem.courseItemReadOne);
router.delete('/courses/:courseid/courseitem/:courseitemid',controlCourseItem.courseItemDeleteOne);


/* User pages  TODO*/
router.get('/users',controlUser.userList);
router.get('/user', controlUser.userDetail);


module.exports = router;