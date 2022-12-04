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

const Category = require('../models/Category.js');

exports.getCategories = function (req, res) {
    // get all categories using mongoose
    // render categories page with data
    res.render('index',{title:'express'});
};

exports.getCategoryById = function (req, res) {
    // get category by req.params.id
    // get all foodItems with category id as specified in req.params.id
    // render categories page with data
};

module.exports = getCreateCategoryForm = (req, res) => {
    //render categoryForm page
};

module.exports = createNewCategory = (req, res) => {
    //create new category object and save it to database
    //redirect to /categories route
};

module.exports = getUpdateCategoryForm = (req, res) => {
    //get category by id as specified in req.param.id
    //render categoryForm and populate fields with data found in category
};

module.exports = updateCategory = (req, res) => {
    //update category object and save it to database
    //redirect to /categories/category/id route
};

module.exports = getDeleteCategoryForm = (req, res) => {
    //get category data by id
    //get all foodItems by category id
    // render deleteForm page with data
};

module.exports = deleteCategory = (req, res) => {
    //delete category from database
    // redirect to /categories route
};
