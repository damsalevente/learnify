var utillib = require("./util");

var mongoose = require("mongoose");

var Partner = mongoose.model("Partner");

module.exports.partner_list = function (req, res, next) {
    Partner
        .find()
        .exec(function (err, partners) {
            if (err) {
                res.tpl.status = 404;
                res.tpl.content = err;
                return next();

            }
            res.tpl.status = 200;
            res.tpl.content = partners;
            res.tpl.partners = partners;
            return next();
        });
};

module.exports.partner_detail = function (req, res, next) {
    if (req.params && req.params.partnerid) {
        Partner
            .findById(req.params.partnerid)
            .exec(function (err, partner) {
                if (!partner) {
                    res.tpl.status = 404;
                    res.tpl.content = {
                        "message": "no partner here :/"
                    };
                    return next();
                } else if (err) {
                    res.tpl.status = 300;
                    res.tpl.content = err;
                    return next();
                }
                res.tpl.status = 200;
                res.tpl.content = partner;
                res.tpl.partner = partner;
                return next();
            })
    } else {
        res.tpl.status = 404;
        res.tpl.content = {
            message: 'params not ok'
        };
        return next()
    }
};

module.exports.partner_create_get = function (req, res) {
    // call create and the body params
    Partner.create({
        name: req.body.name,
        address: req.body.address,
        partner_name: req.body.partner_name,
        partner_email: req.body.partner_email,
        partner_phone: req.body.partner_phone,
        description: req.body.description,
        image_filename: req.body.image_filename,
    }, function (err, partner) {
        if (err) {
            utillib.sendJsonResponse(res, 300, err);
        } else {
            utillib.sendJsonResponse(res, 201, partner);
        }
    });
};

module.exports.partner_delete_get = function (req, res, next) {
            res.tpl.partner.remove(function (err, partner) {
                if (err) {
                    res.tpl.status = 404;
                    res.tpl.content = err;
                    return next();
                } else {
                    res.tpl.status = 404;
                    res.tpl.content = partner;
                    return next();
                }
            });

};


module.exports.partner_update_get = function (req, res, next) {
    var partner = undefined;
    if (res.tpl.partner) {
        partner = res.tpl.partner;
    } else {
        partner = new Partner();
    }

    partner.name = req.body.name;
    partner.address = req.body.address;
    partner.partner_name = req.body.partner_name;
    partner.partner_email = req.body.partner_email;
    partner.partner_phone = req.body.partner_phone;
    partner.description = req.body.description;
    partner.image_filename = req.body.image_filename;

    partner.save(function (err, partner) {
        if (err) {
            res.tpl.status = 404;
            res.tpl.content = err;
            return next();
        } else {
            res.tpl.status = 200;
            res.tpl.content = partner;
            return next();
        }
    });

};
