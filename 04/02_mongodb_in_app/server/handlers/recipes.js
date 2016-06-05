
var recipe_data = require("../data/recipes.js");


/**
 *  start, number, callback 
 *  start, number, ordervals, callback 
 *  filterfieldvals, start, number, ordervals, callback 
 */
exports.get_recipes = function () {
    recipe_data.list_recipes.apply(this, arguments);
};

exports.add_recipe = function (recipe, callback) {
    recipe_data.add_recipe(recipe, callback);
};

exports.get_recipe_by_id = function (recipe_id, callback) {
    recipe_data.get_recipe_by_id(recipe_id, callback);
}
