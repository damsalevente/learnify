var mongoose = require('mongoose');
var Cour = mongoose.model('Course');


module.exports.courseList = function(req,res){
    Cour
        .find()
        .exec(function(err,courselist){
            res.status(200);
            res.json(courselist);
        })
};
module.exports.courseOneElement = function(req,res){
    if(req.params && req.params.courseid){
    Cour
        .findById(req.params.courseid)
        .exec(function(err,course){
            if(!course){
                res.status(404);
                res.json({"message": "course not found"});
                return;
            }else if(err){
                res.status(404);
                res.json(err);
                return;
            } else{
            res.status(200);
            res.json(course);
            }
        });
    } else{
        res.status(404);
        res.json({"message": "course id not specified"});
    }
};
module.exports.courseCreate = function(req,res){
    Cour.create({
        name: req.body.name,
        type: req.body.type,
        rating: parseInt(req.body.rating),
        favourite_subjects: req.body.favourite_subjects.split(","),
        courses: req.body.courses
    },function(err, course){
        if(err){
            res.status(400);
            res.json(err);
        } else{
            res.status(201);
            res.json(course);
        }
    })
    res.status(200);
    res.json({'status': "success"});
};
module.exports.courseUpdate = function(req,res){
    res.status(200);
    res.json({'status': "success"});
};
module.exports.courseDelete = function(req,res){
    res.status(200);
    res.json({'status': "success"});
};