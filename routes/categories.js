const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController.js');


router.get('/', categoryController.getCategories);

router.get('/category/:catId', categoryController.getCategoryById);

router.get('/createCategory', categoryController.getCreateCategoryForm);

router.post('/createCategory', categoryController.createCategory);

router.get('/category/:catId/update', categoryController.getUpdateCategoryForm);

router.post('/category/:catId/update', categoryController.updateCategory);

router.get('/category/:catId/delete', categoryController.getDeleteCategoryForm);

router.post('/category/:catId/delete', categoryController.deleteCategory);

module.exports = router;
