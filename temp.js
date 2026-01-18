const mongoose = require("mongoose");
const Listing = require("./models/listings");
const data = require("./data.js");

async function main(params) {
        await mongoose.connect("mongodb://127.0.0.1:27017/stayVistaHub")
    
}
main().
then((res)=>{
 console.log("connection successfull")
 update()
})


async function update(params) {
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("done")
}



