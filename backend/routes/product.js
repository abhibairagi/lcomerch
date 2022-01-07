const express = require("express");
const router = express.Router();
const {check , validationResult } = require("express-validator");


const {getProductById , createProduct , getProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product")
const {isSignedIn , isAuthenticated , isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

// Paramater Route()
router.param("userId", getUserById);
router.param("productId", getProductById)


//Post route 
router.post("/product/create/:userId",[
    // check("name", "Product name should be at least 3 char").isLength({ min: 3 }),
    // check("description", "description is required").isLength({min: 10}),
    // check("price", "price is required").isLength({min: 2}),
    // check("stock", "Stocl is required").isLength({min: 1}),
    // check("category", "Category is required").isObject()
],isSignedIn, isAuthenticated, isAdmin, createProduct)


//get routes 
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

// updated Route 
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

//delete Route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)

// Listing Route   Means whenever you open the page you need to show something that is listing route 
router.get("/products", getAllProducts)

router.get("/products/categories", getAllUniqueCategories);


module.exports = router;