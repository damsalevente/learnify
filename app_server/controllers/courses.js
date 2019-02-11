
/* GET home page */
module.exports.homelist = function(req,res){
    res.render('pages/courselist', { title: 'Course list',
    courseList: [
        {
            name: "Matek A1",
            difficulty: "Hard",
            numUsers: 123
        },
        {
            name: "Terek",
            difficulty: "Easy",
            numUsers: 666
        } 
        ]
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

