module.exports.sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.send_json = function (req, res) {
    console.log(res.tpl.status);
    res.status(res.tpl.status);
    res.json(res.tpl.content);
}
