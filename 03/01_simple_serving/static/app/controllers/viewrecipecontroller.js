(function () {

    // 1. declare our controller.
    function ViewRecipeController ($scope, $routeParams, recipeProvider) {

        $scope.recipe = recipeProvider.getRecipeById($routeParams.recipe_id);

        if (!$scope.recipe) {
            console.log("TODO(marc): don't be lazy ya bum!");
        }

    }

    // 2. create the controller and give it $scope.
    recipesApp.controller("ViewRecipeController", ['$scope', '$routeParams', 'recipeProvider', ViewRecipeController]);

})();
