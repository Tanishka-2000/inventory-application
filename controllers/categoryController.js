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

exports.getCategories = (req, res) => {
    // get all categories using mongoose
    FoodCategory.find({}, function(err, docs){
        // if(err) console.log(err);
        // else
        console.log(docs);
        res.render('index',{title:'express'});
    });
    // render categories page with data
};

exports.getCategoryById = (req, res) => {
    // get category by req.params.id
    // get all foodItems with category id as specified in req.params.id
    // render categories page with data
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
