const {listingSchema, reviewSchema}=require("./serverSchema.js");
const Listing=require("./models/listings.js")
const Review=require("./models/reviews.js")
const ExpressError=require("./utils/ExpressError.js")


module.exports.isAuthenticate=(req,res,next)=>{
     if(req.isAuthenticated()){
        next()
    }else{
        req.session.redirectUrl=req.originalUrl;
        req.flash("failure","you must be logged in first !!")
        res.redirect("/signin")
    }
   
 }

  module.exports.redirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
     next();
  
 }

module.exports.validateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next();
    }
}


module.exports.isOwner=async(req,res,next)=>{
        let {id}=req.params
        let listing=await Listing.findById(id)
        let listingOwner=listing.owner._id;
        if(!res.locals.userInfo._id.equals(listingOwner)){
                    req.flash("failure","you are not the owner of it!!")
                    return res.redirect(`/listings/view/${id}`)
                }
        next()
}


module.exports.isReviewOwner=async(req,res,next)=>{
        let {reviewId}=req.params;
        let review=await Review.findById(reviewId)
        let reviewOwner=review.author;
        if(!res.locals.userInfo._id.equals(reviewOwner)){
                    req.flash("failure","you are not the owner of it!!")
                    return res.redirect(`/listings/view/${id}`)
                }
        next()
}

