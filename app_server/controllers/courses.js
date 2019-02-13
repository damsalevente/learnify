var request = require('request');
var apiOptions = {
    server: 'http://localhost:3000'
};


/* GET home page */
module.exports.homelist = function(req,res){
    var requestOptions, path;
    path = '/api/courses';
    requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json:{},
    };
    request(requestOptions, function(err,response,body){
        res.render('pages/courselist',{
            title: 'Course list',
            courseList: body,
        });
    });

};

/* GET course details */
module.exports.courseInfo = function(req,res){
    res.render('pages/courseDetail', {title: 'Course details',
course: [
    {
        name: "Bevezető",
        time: "12 perc",
        finished: false
    },
    {
        name: "Határérték fogalma",
        time: "10 perc",
        finished: true
    } 
    ]
});
};

