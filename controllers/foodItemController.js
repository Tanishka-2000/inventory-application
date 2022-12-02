
module.exports = getFoodItemById = (req, res) => {
    // get foodItems with foodItem id as specified in req.params.id
    // render foodItems page with data
}

module.exports = getFoodItemForm = (req, res) => {
    //render FoodItemForm page
}

module.exports = createNewFoodItem = (req, res) => {
    //create new foodItem object and save it to database
    //redirect to /categories/category/id route
}

module.exports = getUpdateFoodItemForm = (req, res) => {
    //get FoodItem by id as specified in req.param.id
    //render FoodItemForm page and populate fields with data found in foodItem
}

module.exports = updateFoodItem = (req, res) => {
    //update foodItem object and save it to database
    //redirect to /foodItems/foodItem/id route
}

module.exports = getDeleteFoodItemForm = (req, res) => {
    //get foodItem data by id
    // render deleteForm page with data
}

module.exports = deleteFoodItem = (req, res) => {
    // delete foodItem from database
    // redirect to /categories/category/id route
}
