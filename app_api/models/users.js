var mongoose = require('mongoose');


var user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    password: String
});

// Original, if i don't find in my controllers
// mongoose.model('Course', courseSchema);
mongoose.model('User', user);
