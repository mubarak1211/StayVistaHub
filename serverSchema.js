let joi = require("joi")

module.exports.listingSchema= joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        price:joi.number().required().min(0),
        country:joi.string().required(),
        location:joi.string().required(),
        url:joi.string().allow("",null)  //using it because url is not requried and also to use null value and empty string

    })
    .required()
})

module.exports.reviewSchema=joi.object({
    review:joi.object({
        comment:joi.string().required(),
        rating:joi.number().required().min(1).max(5)
    }).required()
})