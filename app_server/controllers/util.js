var request = require('request');
module.exports.renderpage = function (viewname) {
    return function (req, res) {
        res.render(viewname, res.tpl);
    }
};

module.exports.apicall = function (req, res, next) {

    request(res.tpl.requestOptions, function (err, response, body) {
        if (err) {
            res.status(300);
            res.json(err);
            return next();
        } else {
            console.log(body);
            res.tpl.data = body;

            return next();
        }
    });
};

