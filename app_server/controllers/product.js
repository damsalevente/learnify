var request = require('request');
var multer = require('multer');
var path = require('path');
// file storage
var storage = multer.diskStorage({
    destination: './public/images/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Init upload
var upload = multer({
    storage: storage,
    limits: {
        filesize: 1000000
    },
    fileFilter: function (req, file, cb) {
        check_file_type(file, cb);
    }

}).single('imagefilenames');

// Check file type
function check_file_type(file, cb) {
    // Check both extension and MIME type 
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only');
    }
}

var apiOptions = {
    server: 'http://localhost:3000'
};


/* GET home page */
module.exports.homelist = function (req, res) {
    var requestOptions, fpath;
    fpath = '/api/products';
    requestOptions = {
        url: apiOptions.server + fpath, // you know why it's required
        method: 'GET', // default is get, 
        json: {}, // good practice, and ensures that i get json back -> no, it gives back plain string, not json if i dont use it lmao

    };
    request(requestOptions, function (err, response, body) {
        if (err) {
            res.status(300);
            res.json(err);
        } else if (response.statusCode == 200) {
            res.render('pages/products', {
                title: 'Product list',
                productlist: body,
            });
        } else {
            res.status(response.statusCode);
            res.json(response.body);
        }
    });

};

module.exports.product_detail = function (req, res) {
    var requestOptions, fpath;
    if (req.params.productid) {
        fpath = '/api/products/' + req.params.productid;
        requestOptions = {
            url: apiOptions.server + fpath,
            method: "GET",
            json: {}
        };
        request(requestOptions, function (err, response, body) {
            if (err) {
                // needs to refoactor using utillib snejsonresponse !!
                res.status(300);
                res.json(err);
            } else if (response.statusCode == 200) {

                res.render('pages/product', {
                    'title': 'Product detail',
                    product: body
                });
            }
        });
    } else {
        res.render('error', {
            "message": "xd"
        });
    }
};


module.exports.do_add_product = function (req, res) {
    var requestOptions, fpath, postData;
    fpath = '/api/products/';

    upload(req, res, (err) => {
        if (err) {
            console.log("Problem");
            res.render('index', {
                msg: err,
            });
        } else {
            postData = {
                name: req.body.name,
                product_id: req.body.product_id,
                price: req.body.price,
                description: req.body.description,
                imagefilenames: req.body.imagefilenames,
            };
            console.log(typeof postData);
            requestOptions = {
                url: apiOptions.server + fpath,
                method: "POST",
                json: postData
            };
            request(requestOptions, function (err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/partners');
                } else {
                    res.render('error');
                }
            })


        }
    });

};

module.exports.add_product = function (req, res) {
    // simple get request, we need to render a beautiful form
    res.render('pages/product_form', {
        "title": "New product"
    });
}