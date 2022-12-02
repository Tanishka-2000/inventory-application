

module.export = getCategories = (req, res) => {
    // get all categories using mongoose
    // render categories page with data
}

module.exports = getCategoryById = (req, res) => {
    // get category by req.params.id
    // get all foodItems with category id as specified in req.params.id
    // render categories page with data
}

module.exports = getCategoryForm = (req, res) => {
    //render categoryForm page
}

module.exports = createNewCategory = (req, res) => {
    //create new category object and save it to database
    //redirect to /categories route
}

module.exports = getUpdateCategoryForm = (req, res) => {
    //get category by id as specified in req.param.id
    //render categoryForm and populate fields with data found in category
}

module.exports = updateCategory = (req, res) => {
    //update category object and save it to database
    //redirect to /categories/category/id route
}

module.exports = getDeleteCategoryForm = (req, res) => {
    //get category data by id
    //get all foodItems by category id
    // render deleteForm page with data
}

module.exports = deleteCategory = (req, res) => {
    //delete category from database
    // redirect to /categories route
}
