var mongoose = require('mongoose');



var product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        index: true,
        unique: true
    },
    price: Number,
    imagefilenames: [String],
    amount: {
        type: Number,
        "default": 0
    },
    description: String,

});



// Original, if i don't find in my controllers
// mongoose.model('Course', courseSchema);
mongoose.model('Product', product);