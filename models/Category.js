const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodCategorySchema = new Schema({
    name: String,
    descripton: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

FoodCategorySchema.virtual('url').get(function () {
    return `foodCategories/foodCategory/${this._id}`;
});

module.exports = mongoose.model('FoodCategory', FoodCategorySchema);
