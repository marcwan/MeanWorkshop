(function () {

    // 1. declare our controller.
    function RecipeListController ($scope, recipeProvider) {
        $scope.new_recipe = { };

        $scope.recipes = recipeProvider.getAllRecipes();
        $scope.error_message = "";
    
        $scope.addRecipe = function (recipe_data) {
            try {
                recipeProvider.addRecipe(recipe_data);
            } catch (e) {
                $scope.error_message = e.message;
            }

            // be sure to update our list of recipes.
            $scope.recipes = recipeProvider.getAllRecipes();
        };

    }

    // 2. create the controller and give it $scope.
    recipesApp.controller("RecipeListController", ['$scope', 'recipeProvider', RecipeListController]);

})();
