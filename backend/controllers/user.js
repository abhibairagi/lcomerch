const User = require("../models/user");
const Order = require("../models/order")


/// fetching user Data by ID 
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};


// getting that user 
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

//  Just an Assignment 
exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(401).json({
        error: "Oops Error No user Found"
      })
    }
    res.send(users)
  })
}

// Updating User details 
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "NOt authorized to edit"
        })
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.send(user)
    }
  )
}

// Populate the Order whenever User wanna to Purchase 

exports.userPurchaselist = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order Found in this list"
        })
      }
      return res.send(order)
    })
}

/// PushOrderinPurchaseList 

exports.pushOrderinPurchaseList = (req, res, next) => {

  let purchases = [];
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product_quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });


  // Store this in DB

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to Save Purchase List"
        })
      }
      next();
    }
  )

}
