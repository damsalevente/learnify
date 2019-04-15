
var mongoose = require("mongoose");

var User = mongoose.model("User");

// check if user exists, sessionid is the user's mongodb _id
module.exports.check_user = function(req,res,next){
  console.log('Check user for you ');
    if(req.body && req.body.email && req.body.password){
    User.findOne({name:req.body.email}).exec(function(error, user){
    if(error)
{
    res.send(error);
    return next();

}else if(!user){
  res.redirect('/login');
}
else if(user.password === req.body.password){
   req.session.userid = user._id; 
   console.log('Login success');
    return res.redirect('/products');
} else {
   res.tpl.status = 305;
    res.send({message:'User not found'});
    return next();
}
    
    });
}else {
  console.log('fields missing');
    res.tpl.status = 404;
    res.tpl.content = {'message':'fields missing'};
    return next();
}
}
module.exports.register = function(req,res,next)
{
    // check if user exists, then create new user from bodyea
    //not enough parameter
    if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
      (typeof req.body.password === 'undefined')) {
      return next();
    }

    //lets find the user
    User.findOne({
      email: req.body.email
    }, function (err, result) {

      if ((err) || (result !== null)) {
        res.tpl.error = 'Your email address is already registered!';
        return next();
      }

      if (req.body.name.length < 3) {
        res.tpl.error = 'The username should be at least 3 characters!';
        return next();
      }

      //create user
      var newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.save(function (err) {
        //redirect to /login
        return res.redirect('/login');
      });
    });
  };