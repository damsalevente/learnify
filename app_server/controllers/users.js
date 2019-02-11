

/* GET user details */
module.exports.userDetail = function(req,res){
    res.render('index', {title: 'User detail'});
};

module.exports.userList = function(req,res){
    res.render('index',{title: 'User list'});
};