const FoodItem = require('../models/FoodItem.js');

exports.getFoodItemById = (req, res, next) => {
    // get foodItems with foodItem id as specified in req.params.id
    FoodItem.findById(req.params.foodId)
    .populate('category')
    .exec((err, foodItem) => {
        if(err){
            return next(err);
        }
        if(foodItem === null){
            // No results.
            const err = new Error("Food Item not found");
            err.status = 404;
            return next(err);
        }
        // render foodItems page with data
        res.render('foodItem',{
            foodItem
        });
    });
}

exports.getCretaeFoodItemForm = (req, res) => {
    //render FoodItemForm page
    res.render('foodItemForm');
}

exports.createNewFoodItem = (req, res) => {
    //create new foodItem object and save it to database
    //redirect to /categories/category/id route
}

exports.getUpdateFoodItemForm = (req, res) => {
    //get FoodItem by id as specified in req.param.id
    //render FoodItemForm page and populate fields with data found in foodItem
}

exports.updateFoodItem = (req, res) => {
    //update foodItem object and save it to database
    //redirect to /foodItems/foodItem/id route
}

exports.getDeleteFoodItemForm = (req, res) => {
    //get foodItem data by id
    // render deleteForm page with data
}

exports.deleteFoodItem = (req, res) => {
    // delete foodItem from database
    // redirect to /categories/category/id route
}
