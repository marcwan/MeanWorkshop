(function () {

    function recipeProvider () {
        var recipes = [ { recipe_id: "pasta_al_pesto",
                          name: 'Pasta al Pesto',
                          serves: 2,
                          preparation_time: 2,
                          cooking_time: 15,
                          ingredients: [ "400g spaghetti", "4tbsp pesto sauce", "salt to taste" ],
                          type: 'Italian',
                          summary: 'A quick and simple dish for any Italian household.',
                          preparation: "Boil the pasta, add the sauce." },
                        { recipe_id: "garilic_pork",
                          name: 'Garlic Pork',
                          serves: 2,
                          preparation_time: 15,
                          cooking_time: 5,
                          ingredients: [ "200g pork loin steak", "6 cloves garlic", "2tbsp vegetable oil",
                                         "2tbsp fish sauce", "black pepper to taste", "salt to taste" ],
                          type: 'Thai',
                          summary: 'A quick and simple meat dish for any Thai table.',
                          preparation: "Chop it all up, fry it all up. Wup wup!" },
                        { recipe_id: "garilic_broccoli",
                          name: 'Garlic Broccoli',
                          serves: 2,
                          preparation_time: 15,
                          cooking_time: 2,
                          ingredients: [ "400g broccoli", "2 cloves garlic", "2tbsp vegetable oil",
                                         "1tsp light soy sauce", "1/4tsp sugar", "1/4tsp salt", "1tsp corn starch" ],
                          type: 'Chinese',
                          summary: 'Healthy and full of flavour, a simple dish.',
                          preparation: "Boil Broccoli for 2 mins, chop everything up,\n\n fry it all up. Add salt, sugar, and soy sauce." },
                        { recipe_id: "black_pepper_beef_00131234",
                          name: 'Black Pepper Beef',
                          serves: 2,
                          preparation_time: 20,
                          cooking_time: 5,
                          ingredients: [ "200g lean beef", "2 cloves garlic", "2tbsp vegetable oil",
                                         "1tsp light soy sauce", "1/4tsp sugar", "1/4tsp salt", "1tsp dark soy sauce" ],
                          type: 'Chinese',
                          summary: 'Delicious and rich in flavour. A Chinese classic.',
                          preparation: "chop it up, fry it up, try not to set your kitchen on fire." }
                      ];


        this.getAllRecipes = function () {
            return recipes;
        };

        this.addRecipe = function (recipe_data) {
            var rid = this.getUniqueRecipeId(recipe_data);

            if (!recipe_data.name) throw new Error("missing_name");
            if (!recipe_data.type) throw new Error("missing_type");
            if (!recipe_data.summary) throw new Error("missing_summary");

            recipes.push(JSON.parse(JSON.stringify(recipe_data)));
        };


        this.getRecipeById = function (recipe_id) {
            for (var i = 0; i < recipes.length; i++) {
                if (recipes[i].recipe_id == recipe_id) {
                    return JSON.parse(JSON.stringify(recipes[i]));
                }
            }

            throw new Error("no_such_recipe");
        };


        // This would be more efficient w hashing instead of array iteration, but
        // we're moving this to a database in a few minutes anyway, so no worries.
        this.getUniqueRecipeId = function(recipe_data) {
            if (!recipe_data.name) {
                return undefined;
            }
            
            var proposed_id = recipe_data.name.split(" ").join("_") + "" + (new Date().getTime());
            var unique = false;
            while (!unique) {
                var i;
                for (i = 0; i < recipes.length; i++) {
                    if (recipes[i].recipe_id == proposed_id) {
                        break;
                    }
                }

                if (i == recipes.length) {
                    unique = true;
                } else {
                    proposed_id = proposed_id + "" + (new Date().getTime());
                }
            }

            return proposed_id;
        }
                
    }

    recipesApp.service("recipeProvider", recipeProvider);

})();
