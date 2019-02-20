require("./util");

var mongoose = require("mongoose");

var Partner = mongoose.model("Partner");

module.exports.partner_list = function(req,res){
    Partner
        .find()
        .exec(function(err,partners){
            if(err){
                sendJsonResponse(res,404,err);
                return;
            }
            sendJsonResponse(res,200,partners);
        })
};

module.exports.partner_detail = function(req,res){
    res.send('Not implemented');
};

module.exports.partner_create_get = function(req,res){
    res.send('Not implemented');
};

module.exports.partner_create_post = function(req,res){
    res.send('Not implemented');
};

module.exports.partner_delete_get = function(req,res){
    res.send('Not implemented');
};

module.exports.partner_delete_post = function(req,res){
    res.send('Not implemented');
};

module.exports.partner_update_get = function(req,res){
    res.send('Not implemented');
};

module.exports.partner_update_post = function(req,res){
    res.send('Not implemented');
};