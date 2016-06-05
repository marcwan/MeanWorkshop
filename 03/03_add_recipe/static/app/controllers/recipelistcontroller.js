(function () {

    // 1. declare our controller.
    function RecipeListController ($scope, recipeProvider) {

        $scope.new_recipe = { };
        $scope.add_recipe_error = null;

        $scope.page_load_error = null;
        $scope.finished_loading = false;

        function get_recipes() {
            $scope.recipes = recipeProvider.getAllRecipes(function (err, recipes) {
                $scope.finished_loading = true;
                if (err) {
                    $scope.page_load_error = err.message;
                } else {
                    $scope.recipes = recipes;
                }                
            });
        }
    
        $scope.addRecipe = function (recipe_data) {
            recipeProvider.addRecipe(recipe_data, function (err, recipe) {
                if (err) {
                    $scope.add_recipe_error = "(" + err.error + ") " + err.message;
                } else {
                    $scope.add_recipe_error = null;
                    get_recipes();
                }                
            });
        };

        get_recipes();
    }

    // 2. create the controller and give it $scope.
    recipesApp.controller("RecipeListController", ['$scope', 'recipeProvider', RecipeListController]);

})();
