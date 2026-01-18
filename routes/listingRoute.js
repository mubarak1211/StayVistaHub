let express=require("express");
let router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isAuthenticate,validateListing,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudinary.js")
const upload = multer({storage})



// all listings route
router.get("/",wrapAsync(listingController.renderAllListings))

//search route
router.get("/search",wrapAsync(listingController.renderSearchResult))

// view route
router.get("/view/:id",wrapAsync(listingController.renderView))

router
.route("/new")
// add new list route
    .get(isAuthenticate,listingController.renderNewForm)
//create listing
    .post(isAuthenticate,validateListing,upload.single("listing[image]"),wrapAsync(listingController.postNewForm));

router
    .route("/edit/:id")
//edit form
    .get(isAuthenticate,isOwner,wrapAsync(listingController.renderEditForm))
//update or edit listing
    .put(isAuthenticate,isOwner,validateListing,upload.single("listing[image]"),wrapAsync(listingController.postEditForm))

//delete listing
router.delete("/delete/:id",isAuthenticate,isOwner, wrapAsync(listingController.deleteListing))

module.exports=router;