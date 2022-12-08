const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    category: {type: Schema.Types.ObjectId, ref: "FoodCategory"},
    price: {type:Number, required:true},
    stock: {type:Number, required:true},
    img:String
});

FoodItemSchema.virtual('url').get(function () {
    return `/foodItems/foodItem/${this._id}`;
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
