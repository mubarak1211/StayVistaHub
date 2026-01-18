let express=require("express");
let router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const {validateReview,isAuthenticate,isOwner,isReviewOwner}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js");


// routes about reviews
router.post("/",isAuthenticate,validateReview,wrapAsync(reviewController.createReview))

//delete review route
router.delete("/:reviewId",isAuthenticate,isReviewOwner,reviewController.deleteReview)

module.exports=router;

