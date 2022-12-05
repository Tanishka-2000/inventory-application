const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    name: String,
    description: String,
    category: {type: Schema.Types.ObjectId, ref: "FoodCategory"},
    price: Number,
    stock: Number,
    nutrition:[String],
});

FoodItemSchema.virtual('url').get(function () {
    return `/foodItems/foodItem/${this._id}`;
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
