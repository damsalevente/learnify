var mongoose = require('mongoose');


var depot = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    place: String,
    product_list:[{
        _id : false,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        amount: Number
    }],
    last_check_date: {
        type: Date,
        "default": Date.now()
    },
});

mongoose.model('Depot', depot);