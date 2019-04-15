var request = require('request');


module.exports.renderpage = function (viewname) {
    return function (req, res) {
      console.log('idsfaákdsafjéalksfjkladsfjlfksklflkdsljfasdjféljéalfa');
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

module.exports.redirectTo = function(pagename){
  return function(req,res){
    res.redirect(pagename)
  };
};

module.exports.auth = function(req,res,next){

    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/');
    }
    return next();

};

module.exports.inv_auth = function(req,res,next){
    console.log('iit vagykléj lkads , ?M??? ');
    console.log(req.session.userid);
    if (typeof req.session.userid !== 'undefined') {
      console.log('itt van abaj ? ');
      return res.redirect('/partners');
    }
    return next();

};

module.exports.logout = function (objectrepository) {

  return function (req, res, next) {
    req.session.destroy(function (err) {
      return next();
    });
  };

};

module.exports.mainredirect = function (req, res, next) {

    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/login');
    } else {
      return res.redirect('/products');
    }
  };

module.exports.filter_deleted = function(req, res, next){
   console.log(res.tpl.data);    
}
