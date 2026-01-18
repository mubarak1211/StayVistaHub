const Review=require("../models/reviews.js")
let Listing=require("../models/listings.js")

module.exports.createReview=async(req,res)=>{
    let {id}=req.params;
    let {review}=req.body;
    let listing=await Listing.findOne({_id:id});
    let newReview=new Review(review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
   await  listing.save();
   await  newReview.save();
     req.flash("success","review added successfully")
    return res.redirect(`/listings/view/${id}`);
}

module.exports.deleteReview=async(req,res)=>{
   let {id,reviewId}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   await Review.findByIdAndDelete(reviewId);
    return res.redirect(`/listings/view/${id}`)
}