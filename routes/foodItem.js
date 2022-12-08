const express = require('express');
const router = express.Router();

const foodItemController = require('../controllers/foodItemController.js');

router.get('/foodItem/:foodId', foodItemController.getFoodItemById);

router.get('/createFoodItem', foodItemController.getCreateFoodItemForm);

router.post('/createFoodItem', foodItemController.createNewFoodItem);

router.get('/foodItem/:foodId/update', foodItemController.getUpdateFoodItemForm);

router.post('/foodItem/:foodId/update', foodItemController.updateFoodItem);

router.get('/foodItem/:foodId/delete', foodItemController.getDeleteFoodItemForm);

router.post('/foodItem/:foodId/delete', foodItemController.deleteFoodItem);

module.exports = router;
