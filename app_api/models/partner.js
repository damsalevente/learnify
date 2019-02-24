var mongoose = require('mongoose');


var partner = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    partner_name: String,
    partner_email: String,
    partner_phone: String,
    description: String,
    image_filename: String,
});

// Original, if i don't find in my controllers
// mongoose.model('Course', courseSchema);
mongoose.model('Partner', partner);