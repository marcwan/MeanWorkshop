(function () {

    // 1. declare our controller.
    function ViewRecipeController ($scope, $routeParams, recipeProvider) {

        $scope.finished_loading = false;
        $scope.page_load_error = null;

        recipeProvider.getRecipeById($routeParams.recipe_id, function (err, recipe) {
            $scope.finished_loading = true;
            if (err) {
                $scope.page_load_error = "Unable to load recipe: " + JSON.stringify(err);
            } else {
                $scope.recipe = recipe;
            }
        });
        

    }

    // 2. create the controller and give it $scope.
    recipesApp.controller("ViewRecipeController", ['$scope', '$routeParams', 'recipeProvider', ViewRecipeController]);

})();
