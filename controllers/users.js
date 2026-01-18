const User=require("../models/user")

module.exports.renderSignUp=(req,res)=>{
   res.render("./users/signup.ejs")
}

module.exports.postSignUp=async(req,res)=>{
   try{
          let {email,username,password}=req.body;
          let newUser=new User({
          email,
          username
          });
          let registeredUser= await User.register(newUser,password);
         req.login(registeredUser,(err)=>{
            if(err){
               next(err)
            }
            req.flash("success","signedUp successfully")
           return  res.redirect("/listings")
         })

   }
   catch(error){
         req.flash("failure",error.message)
         return res.redirect("signup")
   }
}

module.exports.renderSignIn=(req,res)=>{
  return res.render("./users/signin.ejs")
}

module.exports.redirect=async(req,res)=>{
   req.flash("success","welcome back to StayVistaHub")
   const redirectUrl1=res.locals.redirectUrl || "/listings";
   console.log(redirectUrl1)
   return res.redirect(redirectUrl1)
}

module.exports.logOutUser=(req,res,next)=>{

   req.logout((err)=>{
      if(err){
        return next(err)
      }
      else{
         req.flash("failure","you are logged out");
        return res.redirect("/listings")
      }
   })
}