let express=require("express");
let router=express.Router();
const mongoose=require("mongoose");
const User=require("../models/user");
const passport=require("passport");
const wrapAsync = require("../utils/wrapAsync");
const {redirectUrl}=require("../middleware");
const userController=require("../controllers/users")

router
   .route("/signup")
//to get signup-form
   .get(userController.renderSignUp)
// credentials of signup form (post signup)
   .post(userController.postSignUp)

router
   .route("/signin")
//signin page
   .get(userController.renderSignIn)
// credentials of signup form (post signup)
   .post(redirectUrl,passport.authenticate("local",{
   failureRedirect:"/signin",
   failureFlash: "Invalid username or password"
}),userController.redirect)

// logout user
router.get("/logout",userController.logOutUser)

module.exports=router;