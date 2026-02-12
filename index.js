if(process.env.NODE_ENV !="production"){
    require("dotenv").config()
}


const express = require("express");
const app = express();
const port = 8080;
const path=require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ExpressError=require("./utils/ExpressError.js");
let  engine = require('ejs-mate');
const session=require("express-session");
const MongoStore = require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user")

app.engine('ejs', engine);

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views",(path.join(__dirname,"views")));

let listingRoute=require("./routes/listingRoute.js")
let reviewRoute=require("./routes/reviewRoute.js")
let userRoute=require("./routes/userRoute.js")


async function main(params) {
    await mongoose.connect(process.env.DB_LINK)
}

main()
    .then((res)=>{
        console.log("connection is successfull.")
    })
    .catch((err)=>{
        console.log(err)
    })


const store = MongoStore.create({
  mongoUrl: process.env.DB_LINK,
});

store.on("error", (err) => {
  console.log("SESSION STORE ERROR:", err);
});


app.use(
  session({
    store,
    name: "stayvista_session", // optional but clean
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // IMPORTANT
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(flash());

// Passport work
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.failure=req.flash("failure")
    res.locals.userInfo=req.user;
    next();
})


app.use("/listings",listingRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/listings/:id/review",reviewRoute);
app.get("/", (req, res) => {
    res.render("./listsEJS/intro.ejs");
});
app.use("/",userRoute)



app.all(/.*/, (req, res,next) => {
  next(new ExpressError(404,"Page not found"))
});

app.use((err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("./listsEJS/error.ejs", { message });
});





app.listen(port,()=>{
    console.log(`app is listening Port-no.${port}`);
})


