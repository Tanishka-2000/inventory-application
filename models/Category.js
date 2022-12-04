const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodCategorySchema = new Schema({
    name: String,
    description: String,
});

FoodCategorySchema.virtual('url').get(function () {
    return `categories/category/${this._id}`;
});

module.exports = mongoose.model('FoodCategory', FoodCategorySchema);
