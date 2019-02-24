var mongoose = require('mongoose');


var depot = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    place: String,
    product_list: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        default: []
    },
    last_check_date: {
        type: Date,
        "default": Date.now()
    },
});

mongoose.model('Depot', depot);