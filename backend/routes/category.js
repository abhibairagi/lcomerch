const express = require("express");
const router = express.Router();

const {getCategoryById , createCategory, getCategory, getAllCategories , updateCategory, removeCategory}= require("../controllers/category")
const {isSignedIn , isAdmin , isAuthenticated}= require("../controllers/auth")
const {getUserById}= require("../controllers/user")


///  middleware Routes 
router.param("userId", getUserById);
router.param("categoryId", getCategoryById)


/// Post Routes
router.post("/category/create/:userId",isSignedIn ,isAuthenticated, isAdmin , createCategory)

/// Get Route 
router.get("/category/:categoryId",  getCategory)
router.get("/categories", getAllCategories)

/// Update Routes 
router.put("/category/:categoryId/:userId",isSignedIn ,isAuthenticated, isAdmin , updateCategory)

//Delete Category 
router.delete("/category/:categoryId/:userId",isSignedIn ,isAuthenticated, isAdmin , removeCategory)



module.exports = router;