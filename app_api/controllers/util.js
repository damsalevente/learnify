module.exports.sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.send_json = function (req, res, ) {
    res.status(res.tpl.status);
    res.json(res.tpl.content);
}