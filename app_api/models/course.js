var mongoose = require('mongoose');

var courseItemSchema = new mongoose.Schema({
    courseItemname: String,
    courseItemType: String,
    questionsAndAnswers: [{
        question: String,
        answer: String
    }],
    materialFileName: [String],
    finished: {type: Boolean, "default": false}
})

var courseSchema = new mongoose.Schema({
    name: {type:String, required: true},
    type: String,
    rating: {type: Number, "default":0, min:0, max:10},
    courseItems: [courseItemSchema]
});


var personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, "default":'Student'},
    email: String,
    detail: String,
    favourite_subjects: [String],
    courses:[courseSchema],
})

mongoose.model('Course', courseSchema);