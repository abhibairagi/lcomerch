
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        maxlength: 5000,
        trim: true,
    },
    category: {
        type: ObjectId,
        ref: "category",
        required: true,
    },
    stock: {
        type: Number,
    },

    sold: {
        type: Number,
        default: 0,
    },
    photo: {
        data: Buffer,
        contentType: String,
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)