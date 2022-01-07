const Product = require("../models/product")
const formidable = require("formidable");    //  formidabale & lodash libraries to load images
const _ = require("lodash");
const fs = require("fs")
const {validationResult } = require("express-validator");
const product = require("../models/product");
const { filter } = require("lodash");
const category = require("../models/category");


exports.getProductById = (req, res, next , id) => {
    Product.findById(id)
    // wanna to fetch the product based on category 
    .populate("category")
    .exec((err , product)=> {
        if(err){
            return res.status(400).json({
                erro: "Cannot Find Product"
            })
        }
        req.product = product;
        next();
    })
}


exports.createProduct = (req, res) => {

    // const errors = validationResult(req);
 
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         error: errors.array()[0].msg
    //     })
    // }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;                 // extensions means jpeg, png

    form.parse(req, (err , fields , file)=> {
        if (err) {
           return res.status(400).json({
               error: "Failed to Upload Image"
           }); 
        }


        const {name , description , price , category , stock} = fields

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "PLease include All fields"
            })
        }

        // Handling fields just like text 
        // TODO: restricted fields 
        let product = new Product(fields);

        // HAndle File here
        // checking File Size 
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size is too Big"
                });
            }
            // After Saving photo database.
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType =file.photo.type;

        }
        // console.log(product)

        // Save to DB 
        product.save((err , product)=> {
            if (err) {
                return res.status(400).json({
                    error: "Unable to to save to Database."
                })
            }
            res.json(product)
        })
    })

}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}

// Middleware 
//It is used to handle the photo in th background
exports.photo = (req, res , next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

// Delete routes
exports.deleteProduct = (req, res) => {
    const  product = req.product;
    product.remove((err, deletedProduct)=> {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete the Product"
            })
        }
        res.json({
            message: "Product Deleted SuccessFully"
        })
    })
}

// Updating Routes
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;                 // extensions means jpeg, png

    form.parse(req, (err , fields , file)=> {
        if (err) {
           return res.status(400).json({
               error: "Failed to Upload Image"
           }); 
        }

       //Updation  
        let product = req.product;
        product = _.extend(product, fields)

        // HAndle File here
        // checking File Size 
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size is too Big"
                });
            }
            // After Saving photo database.
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType =file.photo.type;

        }
        // console.log(product)

        // Save to DB 
        product.save((err , product)=> {
            if (err) {
                return res.status(400).json({
                    error: "Failed to Update"
                })
            }
            res.json(product)
        });
    });
}

// Listing routes 
exports.getAllProducts =(req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products)=> {
        if(err){
            return res.status(400).json({
                error: "Can't Find Products"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories =(req, res) => {
    Product.distinct("category", {}, (err, category)=> {
        if (err) {
            return res.status(400).json({
                error: "Cannot find Category"
            })
        }
        res.json(category)
    })
}


// Updating Stocks & sold 
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod =>{
        return {
            updateOne: {
                filter: {_id: prod._id},
                update:{$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
        })

        Product.bulkWrite(myOperations, {},(err, products)=> {
            if (err) {
                return res.status(400).json({
                    error: "Bulk Operations Failed"
                })
            }
            // res.json(products)
            next();
        })
}