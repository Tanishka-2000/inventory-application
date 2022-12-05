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
const FoodItem = require('../models/FoodItem.js');
const async = require('async');
const {body, validationResult} = require('express-validator');


exports.getCategories = (req, res, next) => {
    // get all categories using mongoose
    FoodCategory.find({}, function(err, docs){
        if(err) {
            return next(err);
        }else{
            // render categories page with data
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
            title:'Category Detail',
            category: results.category,
            foodItems: results.foodItems,
        });
    });
};

exports.getCreateCategoryForm = (req, res) => {
    //render categoryForm page
    res.render('categoryForm');
};

exports.createCategory = (req, res) =>{
    //create new category object
    const category = new FoodCategory({
        name: req.body.name,
        description: req.body.descp,
    });

    // check for errors
    const error = category.validateSync();
    if(error){
        // if error, render form with error messages
        res.render('createCategoryForm',{
            category:category,
            errors:error.errors,
        });
        return;
    }
    // if no errors, save data to database
    category.save(err => {
        if(err) {
            return next(err);
        }
         //redirect to /categories route
        res.redirect('/categories');
    })
}

exports.getUpdateCategoryForm = (req, res, next) => {
    //get category by id as specified in req.param.id
    FoodCategory.findById(req.params.catId, function(err, category){
        if(err) return next(err);
        if(category === null){
            const err = new Error("Category not found");
            err.status = 404;
            return next(err);
        }
        //render categoryForm and populate fields with data found in category
        res.render('categoryForm',{
            category:category,
        });
    });
};

exports.updateCategory = (req, res) => {
    //update category object
    const category = new FoodCategory({
        name: req.body.name,
        description: req.body.descp,
        _id: req.params.catId,
    });

    // check for errors
    const error = category.validateSync();
    if(error){
        // if error, render form with error messages
        res.render('createCategoryForm',{
            category:category,
            errors:error.errors,
        });
        return;
    }
    // if no errors, update data to database
    FoodCategory.findByIdAndUpdate(req.params.catId, category, {}, (err, updatedCategory) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to /categories/category/id route
      res.redirect(updatedCategory.url);
    });
};

exports.getDeleteCategoryForm = (req, res) => {
    //get category data by id
    //get all foodItems by category id
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
          res.redirect('/categories');
        }
        // render deleteForm page with data
        res.render('delete_category_form',{
            category: results.category,
            foodItems: results.foodItems,
        });
    });
};

exports.deleteCategory = (req, res) => {
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
          res.redirect('/categories');
        }
        // if there are food items under this category
        if(results.foodItems.length > 0){
            // render deleteForm page with data
            res.render('delete_category_form',{
                category: results.category,
                foodItems: results.foodItems,
            });
            return;
        }
        //delete category from database
        FoodCategory.findByIdAndRemove(req.params.catId,(err) => {
          if (err) {
            return next(err);
          }
          // Success - redirect to /categories route
          res.redirect("/categories");
        });
    });
};
