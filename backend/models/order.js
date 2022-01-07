const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;


const ProductCartSchema = new mongoose.Schema({
   product: {
       type: ObjectId,
       ref: "Product",
   }, 
   name : String,
   count: Number,
   price: Number,
})
const productCart = new mongoose.model("productCart", ProductCartSchema)


const OrderSchema = new mongoose.Schema(
    {
      products: [ProductCartSchema],
      transaction_id: {},
      amount: { type: Number },
      address: String,
      status: {
        type: String,
        default: "Received",
        enum: ["delivered", "Shipped", "Processing", "Received", "Cancelled"]
      },
      updated: Date,
      user: {
        type: ObjectId,
        ref: "User"
      }
    },
    { timestamps: true }
  );
  

const Order = new mongoose.model("Order", OrderSchema)


module.exports = {Order , productCart}