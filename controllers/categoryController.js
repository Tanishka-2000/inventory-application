// var multer = require('multer');
//
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
//
// var upload = multer({ storage: storage });

const FoodCategory = require('../models/Category.js');
const FoodItem = require('../models/foodItem.js');
const async = require('async');

exports.getCategories = (req, res, next) => {
    // get all categories using mongoose
    FoodCategory.find({}, function(err, docs){
        if(err) {
            return next(err);
        }else{
            // render categories page with data
            FoodItem.find({},(err, food) => {console.log(food)})
            res.render('index', {categories: docs});
        }
    });
};

exports.getCategoryById = (req, res, next) => {
    // get category by req.params.id
    // get all foodItems with category id as specified in req.params.id
    async.parallel({
        category(callback){
            FoodCategory.findById(req.params.catId, callback);
        },
        foodItems(callback){
            FoodItem.find({category: req.params.catId}, '_id name description', callback);
        },
    },
    (err, results) => {
        if (err) {
          // Error in API usage.
          return next(err);
        }
        if (results.category == null) {
          // No results.
          const err = new Error("Food Category not found");
          err.status = 404;
          return next(err);
        }
        // render categories page with data
        res.render('category',{
            category: results.category,
            foodItems: results.foodItems,
        });
    });
};

exports.getCreateCategoryForm = (req, res) => {
    //render categoryForm page
};

exports.createCategory = (req, res) => {
    //create new category object and save it to database
    //redirect to /categories route
};

exports.getUpdateCategoryForm = (req, res) => {
    //get category by id as specified in req.param.id
    //render categoryForm and populate fields with data found in category
};

exports.updateCategory = (req, res) => {
    //update category object and save it to database
    //redirect to /categories/category/id route
};

exports.getDeleteCategoryForm = (req, res) => {
    //get category data by id
    //get all foodItems by category id
    // render deleteForm page with data
};

exports.deleteCategory = (req, res) => {
    //delete category from database
    // redirect to /categories route
};
