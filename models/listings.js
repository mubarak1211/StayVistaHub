const mongoose=require("mongoose");
const {Schema}=mongoose;
const Review=require("./reviews.js")

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        filename:{
           type:String
        },
      url:{
          type:String,
          default:"https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" ,
          set:(v)=> v === "" ? "https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=" : v
      }
    },
    price:{
     type:Number,
     default:"100"
    },
    location:{
     type:String
    },
    country:{
     type:String
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

listingSchema.post("findOneAndDelete",async function(list){
    console.log("running")
  if (list) {
    await Review.deleteMany({
      _id: { $in: list.reviews }
    })
}
})


const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;
