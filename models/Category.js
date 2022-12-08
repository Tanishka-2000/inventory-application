const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodCategorySchema = new Schema({
    name: {
        type:String,
        required: [true,'Category name must be specified'],
        minLength:[2, 'name must be at least 2 letters long']
    },
    description:{
        type:String,
        required: [true,'Category description must be specified'],
        minLength:[2, 'description must be at least 2 letters long']
    },
    img:String
});

FoodCategorySchema.virtual('url').get(function () {
    return `/categories/category/${this._id}`;
});

module.exports = mongoose.model('FoodCategory', FoodCategorySchema);
