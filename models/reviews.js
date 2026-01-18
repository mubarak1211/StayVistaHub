const mongoose=require("mongoose");
const {Schema}=mongoose;

let reviewSchema= new mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5
    },
    comment:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports=mongoose.model("Review",reviewSchema);



