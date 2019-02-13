var mongoose = require('mongoose');
var Cour = mongoose.model('Course');

var doAddCourseItem = function(req,res,course){
    if(!course)
    {
        res.status(404);
        res.json({
            "message":"course not found"
        })
    } else{
        course.courseItems.push({
            courseItemname: req.body.courseitemname,
            courseItemType: req.body.courseItemType,
            questionAndAnswers: req.body.questionAndAnswers,
            materialFileName: req.body.materialFileName,
        });
        course.save(function(err,course){
            var thisItem;
            if(err){
                res.status(400);
                res.json(err);
            } else{
                thisItem = course.courseItems[course.courseItems.length - 1];
                res.status(201);
                res.json(thisItem);
            }
        })
    }
}

module.exports.courseCreateOne = function(req,res){
    var courseId = req.params.courseid;
    console.log(courseId);
    if(courseId) {
        Cour
            .findById(courseId)
            .select('courseItems')
            .exec(
                function(err,course){
                    if(err){
                        res.status(400);
                        res.json(err);
                    } else {
                        doAddCourseItem(req,res,course);
                    }
                }
            );
    } else {
        res.status(404);
        res.json({"Message":"Course not found, course id is required"});
    }
};
module.exports.getCourseItemList = function(req,res){
    res.status(200);
    res.json({"status":"success"});
};

module.exports.courseItemReadOne = function(req,res){
    res.status(200);
    res.json({"status":"success"});
    Cour
        .findById(req.params.courseid)
        .exec(function(err, course){
            res.send(200);
            res.json(course);
        });
};
module.exports.courseItemDeleteOne = function(req,res){
    res.status(200);
    res.json({"status":"success"});
};