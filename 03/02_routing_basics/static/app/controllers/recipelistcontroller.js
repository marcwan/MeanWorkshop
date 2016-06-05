(function () {

    // 1. declare our controller.
    function RecipeListController ($scope, recipeProvider) {

        $scope.new_recipe = { };
        $scope.add_recipe_error = "";

        $scope.page_load_error = null;
        $scope.finished_loading = false;

        $scope.recipes = recipeProvider.getAllRecipes(function (err, recipes) {
            $scope.finished_loading = true;
            if (err) {
                $scope.page_load_error = err.message;
            } else {
                $scope.recipes = recipes;
            }                
        });
    
        $scope.addRecipe = function (recipe_data) {
            try {
                recipeProvider.addRecipe(recipe_data);
            } catch (e) {
                $scope.add_recipe_error = e.message;
            }

            // be sure to update our list of recipes.
            $scope.recipes = recipeProvider.getAllRecipes();
        };

    }

    // 2. create the controller and give it $scope.
    recipesApp.controller("RecipeListController", ['$scope', 'recipeProvider', RecipeListController]);

})();
