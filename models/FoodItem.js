const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    name: String,
    descripton: String,
    category: {type: Schema.Types.ObjectId, ref: "Book"},
    price: Number,
    stock: Number,
    Nutrition:[String],
    image:String
});

FoodItemSchema.virtual('url').get(function () {
    return `foodItems/foodItem/${this._id}`;
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
