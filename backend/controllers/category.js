const Category = require("../models/category")

exports.getCategoryById = (req, res , next , id) => {
    Category.findById(id).exec((err, cate)=> {
        if(err) {
            return res.status(400).json({
                error: "Can't Find Category"
            })
        }
        req.category = cate;
        next();
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.createCategory = (req, res)=> {




    const category = new Category(req.body)
    category.save((err, category)=> {
        if(err || !category) {
            return res.status(400).json({
                error: "Not able to add the category"
            })
        }
        res.json(category)
    })
}


exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories)=> {
        if(err) {
            return res.status(400).json({
                error: "NO category has been found"
            })
        }
        res.json(categories)
    })
}


exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedcategory)=> {
        if(err) {
            return res.status(400).json({
                error: "FAiled to update Category"
            })
        }
        res.json(updatedcategory)
    })
    
}


exports.removeCategory =(req, res) => {
    const category = req.category

    category.remove((err, category)=> {
        if (err) {
            return res.status(400).json({
                error: "Unable to remove Category"
            })
        }
        res.json({
            Message: `${category} Category has Succesfully Deleted.`
        })
    })
}