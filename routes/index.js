const express = require('express');
const router = express.Router();

const categoryController = require('categoryController');
const foodItemController = require('foodItemController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/categories')
});

router.get('/categories', categoryController.getCategories);

router.get('/categories/category/:catId', categoryController.getCategoryById);

router.get('/categories/createCategory', categoryController.getCreateCategoryForm);

router.post('/categories/createCategory', categoryController.createCategory);

router.get('/categories/category/:catId/update', categoryController.getUpdateCategoryForm);

router.post('/categories/category/:catId/update', categoryController.updateCategory);

router.get('/categories/category/:catId/delete', categoryController.getDeleteCategoryForm);

router.post('/categories/category/:catId/delete', categoryController.deleteCategory);


router.get('/foodItems/foodItem/:foodId', foodItemController.getFoodItemById);

router.get('/foodItems/createFoodItem', foodItemController.getFoodItemForm);

router.post('/foodItems/createFoodItem', foodItemController.createNewFoodItem);

router.get('/foodItems/foodItem/:foodId/update', foodItemController.getUpdateFoodItemForm);

router.post('/foodItems/foodItem/:foodId/update', foodItemController.updateFoodItem);

router.get('/foodItems/foodItem/:foodId/delete', foodItemController.getDeleteFoodItemForm);

router.post('/foodItems/foodItem/:foodId/delete', foodItemController.deleteFoodItem);

module.exports = router;
