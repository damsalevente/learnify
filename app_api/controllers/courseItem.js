var mongoose = require('mongoose');
var Cour = mongoose.model('Course');

module.exports.courseCreateOne = function(req,res){
    res.status(200);
    res.json({"status":"success"});
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