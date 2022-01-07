const { Order, productCart } = require("../models/order")


exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "Not found any Order"
                })
            }
            req.order = order
            next();
        })
}


exports.getAllOrder = (req, res) => {
    Order.find()
        .populate("user", "_id name email")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No order Found"
                })
            }
            res.json(order)
        })
}


exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to save your Order in db"
            })
        }
        res.json(order)
    })
}

exports.getOrderStatus = (req, res) => {
    //goes to orderSchema then take the path of status 
    res.json(Order.Schema.path("status".enumValues))
}

exports.updateOrder = (req, res) => {
    Order.update(
    {_id: req.body.orderId},
    {$set: {status: req.body.status}},
    (err, order)=> {
        if (err) {
            return res.status(400).json({
                error: "canot Update Order"
            })
        }
        res.json(order)
    })
}