const Listing =require("../models/listings");



module.exports.renderAllListings=async (req,res)=>{
    let allListings=await Listing.find({});
    return res.render("./listsEJS/listings.ejs",{data : allListings})
}

module.exports.renderSearchResult=async(req,res)=>{
    let search=req.query.search;
    let searchListing = await Listing.find({$or :[
            {title :search},
            {location:search},
            {country:search},
    ]})
    if(searchListing.length === 0){
        req.flash("failure",'“Oops! We couldn’t find any stays like that.”');
        return res.redirect("/listings")
    }else{
        return res.render("./listsEjs/listings.ejs",{data:searchListing})
    }

}

module.exports.renderNewForm=(req,res)=>{
    return res.render("./listsEJS/addNew.ejs")
}

module.exports.renderView=async (req,res,next)=>{

    let {id}=req.params;
    let listItem=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listItem){
        req.flash("failure","listing doesn't exist!!")
        return res.redirect("/listings")
    }else{
        return res.render("./listsEJS/view.ejs",{listItem})
    }
   
    
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let item=await Listing.findById(id);
    let originalUrl=item.image.url;
    originalUrl=originalUrl.replace("/upload","/upload/h-300,w_250/");
    return res.render("./listsEJS/edit.ejs",{item,originalUrl})
}

module.exports.postNewForm=async(req,res,next)=>{
    // owner id 
    let owner=req.user._id; 
    let url=req.file.path;
    let filename=req.file.filename;
    let {title,description,image,price,location,country}=req.body.listing;
    let newListing=new Listing({
        title:title,
        description:description,
        image:{
            url:url,
            filename:filename
        },
        price:price,
        location:location,
        country:country,
        owner:owner
    })
     await newListing.save()
     req.flash("success","listing added successfully")
    return res.redirect("/listings")
    
}

module.exports.postEditForm=async (req,res)=>{
    let {id}=req.params;
 
    let {title,description,price,location,country}=req.body.listing;

      let listing=  await Listing.findByIdAndUpdate(id,{
        title:title,
        description:description,
        price:price,
        location:location,
        country:country
        },
        {runValidators:true}
            )
           if(req.file){
            listing.image.url=req.file.path
            listing.image.filename=req.file.filename
             }
        
        await listing.save()

        req.flash("success","listing updated successfully")
        return res.redirect(`/listings/view/${id}`)
}

module.exports.deleteListing=async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    return res.redirect("/listings")
}