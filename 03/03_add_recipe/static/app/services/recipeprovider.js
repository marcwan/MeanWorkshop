(function () {

    function recipeProvider ($http) {

        this._server_host = "";

        this.getAllRecipes = function (callback) {
            $http.get(this._server_host + "/v1/recipes.json")
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    callback(data);
                });
        };

        this.addRecipe = function (recipe_data, callback) {
            $http.put(this._server_host + "/v1/recipes.json", recipe_data)
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    callback(data);
                });
        };

        this.getRecipeById = function (recipe_id, callback) {
            $http.get(this._server_host + "/v1/recipes/" + recipe_id + ".json")
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    callback(data);
                });
        };
                
    }

    recipesApp.service("recipeProvider", [ "$http", recipeProvider]);

})();
