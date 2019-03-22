var utillib = require("./util");

var mongoose = require("mongoose");

var Partner = mongoose.model("Partner");

module.exports.partner_list = function (req, res) {
    Partner
        .find()
        .exec(function (err, partners) {
            if (err) {
                utillib.sendJsonResponse(res, 404, err);
                return;
            }
            utillib.sendJsonResponse(res, 200, partners);
        })
};

module.exports.partner_detail = function (req, res) {
    if (req.params && req.params.partnerid) {
        Partner
            .findById(req.params.partnerid)
            .exec(function (err, partner) {
                if (!partner) {
                    utillib.sendJsonResponse(res, 404, {
                        "message": "no partner here :/"
                    });
                } else if (err) {
                    utillib.sendJsonResponse(res, 400, err);
                }
                utillib.sendJsonResponse(res, 200, partner);
            })
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "partnerid has to be set"
        });
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

module.exports.partner_create_post = function (req, res) {
    res.send('Not implemented');
};

module.exports.partner_delete_get = function (req, res) {
    if (req.params.partnerid) {
        Partner
            .findByIdAndRemove(req.params.partnerid)
            .exec(function (err, partner) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    utillib.sendJsonResponse(res, 204, partner);
                }
            });

    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Product not found, you wanted to delete it anyways...."
        });
    }
};

module.exports.partner_delete_post = function (req, res) {
    res.send('Not implemented');
};

module.exports.partner_update_get = function (req, res) {
    if (req.params.partnerid) {
        Partner
            .findByIdAndUpdate(req.params.partnerid)
            .exec(function (err, partner) {
                if (err) {
                    utillib.sendJsonResponse(res, 404, err);
                } else {
                    partner.name = req.body.name;
                    partner.address = req.body.address;
                    partner.partner_name = req.body.partner_name;
                    partner.partner_email = req.body.partner_email;
                    partner.partner_phone = req.body.partner_phone;
                    partner.description = req.body.description;
                    partner.image_filename = req.body.image_filename;

                    partner.save(function (err, partner) {
                        if (err) {
                            utillib.sendJsonResponse(res, 404, err);
                        } else {
                            utillib.sendJsonResponse(res, 200, partner);
                        }
                    });
                }
            });
    } else {
        utillib.sendJsonResponse(res, 404, {
            "message": "Partner not found"
        });
    }
};

module.exports.partner_update_post = function (req, res) {
    res.send('Not implemented');
};