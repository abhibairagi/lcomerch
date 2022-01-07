const express = require("express")
const router = express.Router();

const {isSignedIn , isAuthenticated , isAdmin} = require("../controllers/auth")
const {getUserById, pushOrderinPurchaseList} = require("../controllers/user")
const {updateStock} =require("../controllers/product")
const {getOrderById, getAllOrder, createOrder, getOrderStatus,updateOrder} = require("../controllers/order")

// Param
router.param("userId", getUserById);
router.param("orderId", getOrderById)

// Get route 
router.get("/order/All/:userId",  
isSignedIn , 
isAuthenticated , 
isAdmin,
getAllOrder)

//Post Route 
router.post("/order/create/:userId", 
isSignedIn, 
isAuthenticated,
pushOrderinPurchaseList,
updateStock, 
createOrder)

// Status Route
router.get("/order/status/:userId",isSignedIn , isAuthenticated , isAdmin, getOrderStatus);

//Update Routes
router.put("order/:orderId/status/:userId",isSignedIn , isAuthenticated , isAdmin, updateOrder)

module.exports = router;