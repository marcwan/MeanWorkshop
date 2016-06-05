(function () {

    // 1. declare our controller.
    function ViewRecipeController ($scope, $routeParams) {
    
        var recipes = [
            { recipe_id: "pasta_al_pesto",
              name: 'Pasta al Pesto',
              serves: 2,
              preparation_time: 2,
              cooking_time: 15,
              ingredients: [ "400g spaghetti", "4tbsp pesto sauce",
                             "salt to taste" ],
              type: 'Italian',
              summary: 'A quick and simple dish for any Italian home.',
              preparation: "Boil the pasta, add the sauce." },
            { recipe_id: "garilic_pork",
              name: 'Garlic Pork',
              serves: 2,
              preparation_time: 15,
              cooking_time: 5,
              ingredients: [ "200g pork loin steak", "6 cloves garlic",
                             "2tbsp vegetable oil", "2tbsp fish sauce",
                             "black pepper to taste", "salt to taste" ],
              type: 'Thai',
              summary: 'A quick and simple meat dish for any Thai table.',
              preparation: "Chop it all up, fry it all up. Wup wup!" },
            { recipe_id: "garilic_broccoli",
              name: 'Garlic Broccoli',
              serves: 2,
              preparation_time: 15,
              cooking_time: 2,
              ingredients: [ "400g broccoli", "2 cloves garlic",
                             "2tbsp vegetable oil", "1tsp light soy sauce",
                             "1/4tsp sugar", "1/4tsp salt", "1tsp corn starch" ],
              type: 'Chinese',
              summary: 'Healthy and full of flavour, a simple dish.',
              preparation: "Boil Broccoli for 2 mins, chop everything up,\n\n fry"
                           + " it all up. Add salt, sugar, and soy sauce." },
            { recipe_id: "black_pepper_beef_00131234",
              name: 'Black Pepper Beef',
              serves: 2,
              preparation_time: 20,
              cooking_time: 5,
              ingredients: [ "200g lean beef", "2 cloves garlic",
                             "2tbsp vegetable oil", "1tsp light soy sauce",
                             "1/4tsp sugar", "1/4tsp salt", "1tsp dark soy sauce" ],
              type: 'Chinese',
              summary: 'Delicious and rich in flavour. A Chinese classic.',
              preparation: "chop it up, fry it up, try not to set your"
                           + "kitchen on fire." }
        ];

        var i;
        for (i = 0; i < recipes.length; i++) {
            if (recipes[i].recipe_id == $routeParams.recipe_id) {
                break;
            }
        }

        if (i > recipes.length) {
            // ???
        }

        $scope.recipe = recipes[i];
    }

    // 2. create the controller and give it $scope.
    recipesApp.controller("ViewRecipeController", [ '$scope', '$routeParams'
                                                   , ViewRecipeController ]);

})();
