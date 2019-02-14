var request = require('request');
var apiOptions = {
    server: 'http://localhost:3000'
};


/* GET home page */
module.exports.homelist = function(req,res){
    var requestOptions, path;
    path = '/api/courses';
    requestOptions = {
        url: apiOptions.server + path, // you know why it's required
        method: 'GET',  // default is get, 
        json:{},        // good practice, and ensures that i get json back
        qs: {
            userid: 8 // querystring, use for later by the api 
        }
    };
    request(requestOptions, function(err,response,body){
        if(err) {
            res.status(300);
            res.json(err);
        } else if(response.statusCode == 200){
        res.render('pages/courselist',{
            title: 'Course list',
            courseList: body,
        });
    } else {
        res.status(response.statusCode);
        res.json(response.body);
    }
    });

};

/* GET course details */
module.exports.courseInfo = function(req,res){
    var requestOptions, path;
    path = '/api/courses/' + req.params.courseid;
    requestOptions = {
        url: apiOptions.server + path, // you know why it's required
        method: 'GET',  // default is get, 
        json:{},        // good practice, and ensures that i get json back
    };
    request(
        requestOptions,
        function(err,response,body){
            res.render('pages/courseDetail', {
                title: 'Course details',
                course: body,
            });
        
        }
    );
};


module.exports.courseDoNew = function(req,res){
    path = '/api/courses';
    requestOptions = {
        url: apiOptions.server+ path,
        method: 'POST',
        json: {
            name: req.body.name,
            type: req.body.type,
            rating: req.body.rating,
            courseItems: []
        },
    };
    request(
        requestOptions,
        function(err,response,body) {
            if(response.statusCode === 201) {
                res.redirect('/');
            } else {
                res.status(response.status);
                res.json(err);
            }
        }
    )

    
}

module.exports.courseNew = function(req,res){
    var requestOptions,path;
    path = "api/courses";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err,response, body) {
            var data = body;
            if (response.status === 200){
                res.render('pages/courseform',data);    
                
            } else {
                res.status(300);
                res.json({"Error":"Problem"});
            }
        }
    );

}