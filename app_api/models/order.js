var mongoose = require('mongoose');

var order = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner'
    },
    order_status: {
        type: String,
        required: true,
        enum: ['in_order', 'ready_order', 'out_order', 'affirmed_order', 'cancelled_order'],
        default: 'in_order'
    },
    product_list: [{
        _id : false,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        amount: Number
    }]
});


// Original, if i don't find in my controllers
// mongoose.model('Course', courseSchema);
mongoose.model('Order', order);