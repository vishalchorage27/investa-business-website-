const mongoose = require("mongoose");

const businessIdeaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        fundingRequired: {
            type: Number,
            required: [true, "Funding is required"]
        },
        industry: {
            type: String,
            required: [true, "Industry is required"]
        },

        //Entrepreneur ID
        entrepreneurId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Entrepreneur Id is required"]
        },

        //Interested Investor IDs
        interestedInvestors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    { timestamps: true }
);

module.exports= mongoose.model("BusinessIdea", businessIdeaSchema)