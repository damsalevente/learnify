require('../models/db');
var mongoose = require('mongoose');
var Depot = mongoose.model('Depot');
var Product = mongoose.model('Product')

var create_product = function () {
    Product.create({
        name: "Perma 1",
        product_id: 123,
        price: 8000
    }, function (err, created_obj) {
        if (err) {
            console.log(err);
        } else {
            console.log(created_obj + " created");
        }
    });
};
var test_create = function () {
    Depot.create({
        name: "Garage",
        place: "1185 Tas u. 41",
        proudct_list: []
    }, function (err, created_obj) {
        if (err) {
            console.log(err);
        } else {
            console.log(created_obj + " created ");
        }
    });
}

var test_push = function (depot_id) {
    Depot.findOneAndUpdate({name: 'Garage'}).exec(
        function (err, depot) {
            if (err) {
                console.log(err);

            } else {
                Product.findOne({name:"Perma 1"},function(err,product){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Pushing the element into the array");
                        console.log(depot);
                        depot.product_list.push({product:product._id, amount:10});
                        depot.save(function(err,response){
                            if(err){
                                console.log(err);
                            } else {
                                console.log(response);
                            }
                        });
                        console.log(depot);
                    }
                })
                
                console.log(depot);
            }
        }
    )
}
var list_all_depots_populated = function(){
    Depot.find().select('product_list').populate([ { path: 'product_list.product'}]).exec(function(err, result){
       result.forEach(function(value){
           console.log("Just one : " + value['product_list']);
       })
    })
}
// i get the details from the user 
var create_and_push = function(){
    //from req.params
    whatifoundis = 69
    Depot.findOne().exec(function(err,depot){
        Product.create({
            name:"SPERMA HAHAHHAHA",
            product_id: Date.now().toString(),
            price: 400,
            imagefilenames : ["bullyme.jpg"],
            description: 'Kenőanyag'
        },function(err,product_item){
            if(err){
                console.log(err);
            } else {
                console.log(product_item)
                depot.product_list.push({product: product_item._id, amount:whatifoundis });
                depot.save(function(err,res){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Save succesfull : " + res);
                    }
                });
            }
        });
    });
}
//create_product();
//test_create();
//test_push();
//list_all_depots_populated();
//create_and_push();
//console.log("\n\nafter:\n\n");
list_all_depots_populated();
