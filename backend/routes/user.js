const express = require("express");
const router = express.Router();

const { getUserById, getUser , getAllUsers, updateUser, userPurchaselist } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

// get All user 
router.get("/users", getAllUsers);
 

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaselist)



module.exports = router;
