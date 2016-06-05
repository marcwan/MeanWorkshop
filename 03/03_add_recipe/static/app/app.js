var recipesApp = angular.module("recipesApp", [ "ngRoute" ]);

recipesApp.config(function ($routeProvider) {
    $routeProvider
        .when("/recipes",  { controller: "RecipeListController", templateUrl: "/app/partials/recipe_list.html" })
        .when("/recipes/:recipe_id",  { controller: "ViewRecipeController", templateUrl: "/app/partials/view_recipe.html" })
        .when("/",  { redirectTo: "/recipes" })
        .otherwise({ redirectTo: "/404_page" });
});
