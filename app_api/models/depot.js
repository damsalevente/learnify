var mongoose = require('mongoose');


var depot = new mongoose.Schema({
    name: { type: String, required: true },
    place: String,
    product_list: [ {type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
    last_check_date: { type: Date, "default": Date.now() },
}
);

mongoose.model('Depot', depot);
