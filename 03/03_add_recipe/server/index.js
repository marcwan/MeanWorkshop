
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    async = require("async");

var _port = 8082;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../static"));


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


app.get("/v1/recipes.json", function (req, res) {
    return send_success_resp(res, recipes);
});

app.get("/v1/recipes/:recipe_id.json", function (req, res) {
    for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].recipe_id == req.params.recipe_id) {
            return send_success_resp(res, recipes[i]);
        }
    }

    // If we're still here, we failed to find it.
   return send_error_resp(res, 404, "no_such_recipe", "Couldn't find a recipe with the given recipe_id.");
});

app.put("/v1/recipes.json", function (req, res) {
    var rid = get_unique_recipe_id(req.body);

    try {
        if (!req.body.name) throw new Error("missing_name");
        if (!req.body.type) throw new Error("missing_type");
        if (!req.body.summary) throw new Error("missing_summary");
    } catch (e) {
        return send_error_resp(res, 400, e.message, "You sent us an invalid recipe.");
    }

    req.body.recipe_id = rid;
    recipes.push(JSON.parse(JSON.stringify(req.body)));
    send_success_resp(res, req.body);
});

console.error("Starting Server.");
app.listen(_port);










/**
 * res, http_status, code, message
 * res, http_status, err obj
 * res, err obj
 */
function send_error_resp() {
    var res, http_status, code, message;
    if (arguments.length == 4) {
        res = arguments[0];
        http_status = arguments[1];
        code = arguments[2];
        message = arguments[3];
    } else if (arguments.length == 3) {
        res = arguments[0];
        http_status = arguments[1];
        code = arguments[2].error;
        message = arguments[2].message;
    } else if (arguments.length == 2) {
        res = arguments[0];
        http_status = _http_code_from_error(arguments[1].error);
        code = arguments[1].error;
        message = arguments[1].message;
    } else {
        console.error("send_error_resp: YOU'RE DOING IT WRONG");
        throw new Error("send_error_resp called wrong-est-ly");
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(http_status).send(JSON.stringify({ error: code, message: message }));
    res.end();
}

function send_success_resp(res, obj) {
    if (arguments.length != 2) {
        console.error("send_success_resp: YOU'RE DOING IT WRONG");
        throw new Error();
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(obj));
    res.end();
}


function _http_code_from_error (error_code) {
    switch (error_code) {
      // add other messages here when they're not server problems.
      default:
        return 503;
    }
}







// This would be more efficient w hashing instead of array iteration, but
// we're moving this to a database in a few minutes anyway, so no worries.
function get_unique_recipe_id (recipe_data) {
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
