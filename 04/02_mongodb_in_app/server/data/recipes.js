
var db = require("./db.js"),
    async = require('async');

/**
 *  start, number, callback 
 *  start, number, ordervals, callback 
 *  filterfieldvals, start, number, ordervals, callback 
 */
exports.list_recipes = function () {
    var start, number, callback, ordervals, filterfieldvals;

    switch (arguments.length) {
      case 3:
        start = arguments[0];
        number = arguments[1];
        callback = arguments[2];
        break;
      case 4:
        start = arguments[0];
        number = arguments[1];
        ordervals = arguments[2];
        callback = arguments[3];
        break;
      case 5:
        filterfieldvals = arguments[0];
        start = arguments[1];
        number = arguments[2];
        ordervals = arguments[3];
        callback = arguments[4];
        break;
      default:
        throw new Error("This is not a valid use");
    }

    var filter = filterfieldvals ? filterfieldvals : {};
    var output = [];
    var orderby = ordervals ? ordervals : { name : 1 };

    var cursor = db.recipes.find(filter)
        .sort(orderby)
        .skip(start)
        .limit(number);
    cursor.on("data", function (recipe) {
        output.push(recipe);
    });
    cursor.once("end", function () {
        callback(null, output);
    });
};

/**
 * mandatory fields:
 *
 *     name: strin
 *     type: string
 *     summary: string
 *
 * also:
 *
 *     serves: int
 *     preparation_time: int
 *     cooking_time: int
 *     ingredients: [ string, ... ]
 *     preparation: string
 *
 * we add recipe_id in our database code.
 */
exports.add_recipe = function (recipe_data, callback) {
    try {
        if (!recipe_data.name) throw new Error("missing_name");
        if (!recipe_data.type) throw new Error("missing_type");
        if (!recipe_data.summary) throw new Error("missing_summary");
    } catch (e) {
        callback({ error: e.message, message: "This is not a valid recipe."});
    }

    async.waterfall([
        // get a unique id for this new recipe.
        function (cb) {
            get_unique_recipe_id(recipe_data, cb);
        },
        // pass it on to the database.
        function (recipe_id, cb) {
            console.log("did i get a recipeid?" + recipe_id);
            recipe_data = JSON.parse(JSON.stringify(recipe_data));
            recipe_data.recipe_id = recipe_id;

            db.recipes.insertOne(recipe_data, { w: 1 }, cb);            
        },
    ], function (err, results) {
        callback(err, results);
    });
};

exports.get_recipe_by_id = function (recipe_id, callback) {
    var found_recipe = null;
    
    var cursor = db.recipes.find({ recipe_id: recipe_id }).limit(1);
    cursor.on("data", function (recipe) {
        found_recipe = recipe;
    });
    cursor.on("end", function () {
        console.log(JSON.stringify(found_recipe, null, 3));
        callback(null, found_recipe);
    });
};



/**
 * helper function to generate a recipe_id for us.
 */
function get_unique_recipe_id (recipe_data, callback) {
    if (!recipe_data.name) {
        return undefined;
    }

    var ok = false;

    var proposed_id = recipe_data.name.split(" ").join("_");

    async.doUntil(
        function (cb) {
            proposed_id += "" + (new Date().getTime());

            // only set this to true if we see a recipe!
            ok = true;
            var cursor = db.recipes.find({ recipe_id: proposed_id }).limit(1);
            cursor.on("data", function (recipe) {
                console.log("I got a recipe.....");
                if (recipe) {
                    ok = false;
                }
            });
            cursor.once("end", function () {
                console.log("Im done.....");
                cb(null);
            });
        },
        function () {
            console.log("QUeried about OK: " + ok);
            return ok;
        },
        function (err, results) {
            callback(err, proposed_id);
        });
    
};
