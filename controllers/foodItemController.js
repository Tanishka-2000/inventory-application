const multer  = require('multer');
const upload = multer({ dest: './public/data/uploads/'});
const fs = require('fs');

const FoodCategory = require('../models/Category.js');
const FoodItem = require('../models/FoodItem.js');
const async = require('async');

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

exports.getCreateFoodItemForm = (req, res, next) => {
    // get all category to send to formHeader
    FoodCategory.find({},'name _id', function(err, categories){
        if(err) return next(err);
        //render FoodItemForm page
        res.render('foodItemForm',{
            foodItem:null,
            categories,
            selected:""
        });
    });
}

exports.createNewFoodItem = [
    upload.single('image'),
    (req, res) => {
        console.log(req.file);
        //create new foodItem object
        const foodItem = new FoodItem({
            name: req.body.name,
            description: req.body.descp ,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            img: req.file ? req.file.filename : '',
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
                    foodItem:foodItem,
                    categories,
                    selected:req.body.category
                });
            });
            return;
        }
        // if no error then save to database
        foodItem.save(err => {
            if(err) return next(err);
            //redirect to /foodItems/foodItem/id route
            res.redirect(foodItem.url);
        });
    }
];

exports.getUpdateFoodItemForm = (req, res) => {
    //get FoodItem by id as specified in req.param.id
    async.parallel({
        foodItem(callback){
            FoodItem.findById(req.params.foodId, callback);
        },
        categories(callback){
            FoodCategory.find({}, 'name _id',callback);
        }
    },
    (err, results) => {
        if(err) return next(err);
        if(results.foodItem === null){
            const error = new Error('Food Item not found');
            error.status = 404;
            return next(error);
        }
        //render FoodItemForm page and populate fields with data found in foodItem
        res.render('foodItemForm',{
            foodItem: results.foodItem,
            categories: results.categories,
            selected:results.foodItem.category
        });
    });
};

exports.updateFoodItem = [
    upload.single('image'),
    (req, res) => {
        console.log(req.file);
        //create new foodItem object
        const foodItem = new FoodItem({
            name: req.body.name,
            description: req.body.descp ,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            img: req.file ? req.file.filename: req.body.hiddenImage,
            _id: req.params.foodId,
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
                    foodItem:foodItem,
                    categories,
                    selected:req.body.category
                });
            });
            return;
        }
        // if no error then save to database
        FoodItem.findByIdAndUpdate(req.params.foodId, foodItem, {}, (err, updatedFoodItem) => {
            if(err) return next(err);
            // remove old image if new image is provided
            if(req.file){
                fs.unlink('./public/data/uploads/'+req.body.hiddenImage, () => {
                    console.log('image deleted');
                });
            }
            //redirect to /foodItems/foodItem/id route
            res.redirect(updatedFoodItem.url);
        })
    }
];

exports.getDeleteFoodItemForm = (req, res) => {
    //get foodItem data by id
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
        // render deleteForm page with data
        res.render('delete_foodItem_form',{
            foodItem
        });
    });
}

exports.deleteFoodItem = (req, res) => {
    // Find food Item by id
    FoodItem.findById(req.params.foodId, (err, foodItem) => {
        if(err){
            return next(err);
        }
        if(foodItem === null){
            // No results.
            const err = new Error("Food Item not found");
            err.status = 404;
            return next(err);
        }
        // remove image
        fs.unlink('./public/data/uploads/'+ foodItem.img, () => {
            console.log('image deleted');
        });
        // delete foodItem from database
        FoodItem.findByIdAndRemove(req.params.foodId, err => {
            if(err) return next(err);
            // redirect to /categories route
            res.redirect('/categories')
        });
    });
}
