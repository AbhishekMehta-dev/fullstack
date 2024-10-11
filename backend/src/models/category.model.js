import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // References the User model for last updater
    },
    isActive: {
        type: Boolean,
        default: true
    }

},{timestamps:true})

const Category = mongoose.model("Category",categorySchema)

export  {Category};