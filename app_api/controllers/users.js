var mongoose = require('mongoose');
var Cour = mongoose.model('Course');

module.exports.userList = function(req,res){
    res.status(200);
    res.json({'Status':'success'});
};
module.exports.userDetail = function(req,res){
    res.status(200);
    res.json({'Status':'success'});
};