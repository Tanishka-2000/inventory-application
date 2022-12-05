const FoodCategory = require('../models/Category.js');
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

exports.getCretaeFoodItemForm = (req, res, next) => {
    // get all category to send to formHeader
    FoodCategory.find({},'name _id', function(err, categories){
        if(err) return next(err);
        //render FoodItemForm page
        res.render('foodItemForm',{
            foodItem:null,
            categories,
            selected:null
        });
    });
}

exports.createNewFoodItem = (req, res) => {
    //create new foodItem object
    const foodItem = new FoodItem({
        name: req.body.name,
        description: req.body.descp ,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
    })
    // check for errors
    const error = foodItem.validateSync();
    if(error){
        // if error, render form with error messages
        console.log(error.errors);
        FoodCategory.find({},'name _id',function(err, categories){
            if(err) return next(err);
            //render FoodItemForm page
            res.render('foodItemForm',{
                foodItem:null,
                categories,
                selected:req.body.category
            });
        });
        return;
    }
    // if no error then save to database
    foodItem.save(err => {
        if(err) return next(err);
        //redirect to /categories/category/id route
        res.redirect(foodItem.url);
    })
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
