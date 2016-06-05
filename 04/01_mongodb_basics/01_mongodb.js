var MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    async = require('async'),
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/recipesapp';

var db;

async.waterfall([function (cb) {
    console.log("------- connect --");
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, dbase) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        db = dbase;
        cb(null);
    });
}, function (cb) {
    console.log("------- insert many --");
    db.collection("recipes").insertMany(recipes, { w: 1 }, function (err, results) {
        assert.equal(null, err);
        assert.equal(results.insertedCount, recipes.length);

        console.log(JSON.stringify(results, 0, 2));
        cb(null);
    });
}, function (cb) {
    console.log("------- insert one --");
    db.collection("recipes").insertOne(recipe, { w: 1 }, function (err, results) {
        assert.equal(null, err);
        assert.equal(results.insertedCount, 1);

        console.log(JSON.stringify(results, null, 4));
        console.log(results.ops[0]._id);
        cb(null, results.ops[0]._id);
    });
}, function (id_to_delete, cb) {
    console.log("------- deleting one --");
    db.collection("recipes").deleteOne({ "_id": ObjectId(id_to_delete) },
                                       { w: 1 }, function (err, results) {
        assert.equal(null, err);
        console.log(JSON.stringify(results, null, 4));
        cb(null);
    });
}, function (cb) {
    console.log("------- stream over entries --");
    var cursor = db.collection("recipes")
        .find({ })
        .sort({ type: -1, name: 1 })
        .limit(2);

    cursor.on("data", function (recipe) {
        console.log(recipe);
    });
    cursor.once("end", function () {
        console.log("== no more recipes. ending.");
        cb(null);
    });
}], function (err, results) {
    console.log("DONE!");
    db.close();
});



var recipe = {
    recipe_id: "blargle",
    name: 'Fancy Pants Dish',
    serves: 4,
    preparation_time: 150,
    cooking_time: 100,
    ingredients: [ "1 cow", "50 potatoes", "500 brussel sprouts" ],
    type: 'Fancy',
    summary: 'OMG this is posh.',
    preparation: "MEAT GRINDER COOK AW YISSS!!!!."
};



var recipes = [ { 
      recipe_id: "pasta_al_pesto",
      name: 'Pasta al Pesto',
      serves: 2,
      preparation_time: 2,
      cooking_time: 15,
      ingredients: [ "400g spaghetti", "4tbsp pesto sauce", "salt to taste" ],
      type: 'Italian',
      summary: 'A quick and simple dish for any Italian household.',
      preparation: "Boil the pasta, add the sauce."
  }, {
      recipe_id: "garilic_pork",
      name: 'Garlic Pork',
      serves: 2,
      preparation_time: 15,
      cooking_time: 5,
      ingredients: [ "200g pork loin steak", "6 cloves garlic", "2tbsp vegetable oil",
                     "2tbsp fish sauce", "black pepper to taste", "salt to taste" ],
      type: 'Thai',
      summary: 'A quick and simple meat dish for any Thai table.',
      preparation: "Chop it all up, fry it all up. Wup wup!"
  }, {
      recipe_id: "garilic_broccoli",
      name: 'Garlic Broccoli',
      serves: 2,
      preparation_time: 15,
      cooking_time: 2,
      ingredients: [ "400g broccoli", "2 cloves garlic", "2tbsp vegetable oil",
                     "1tsp light soy sauce", "1/4tsp sugar", "1/4tsp salt",
                     "1tsp corn starch" ],
      type: 'Chinese',
      summary: 'Healthy and full of flavour, a simple dish.',
      preparation: "Boil Broccoli for 2 mins, chop everything up,\n\n fry it all "
                   + "up. Add salt, sugar, and soy sauce."
  }, {
      recipe_id: "black_pepper_beef_00131234",
      name: 'Black Pepper Beef',
      serves: 2,
      preparation_time: 20,
      cooking_time: 5,
      ingredients: [ "200g lean beef", "2 cloves garlic", "2tbsp vegetable oil",
                     "1tsp light soy sauce", "1/4tsp sugar", "1/4tsp salt",
                     "1tsp dark soy sauce" ],
      type: 'Chinese',
      summary: 'Delicious and rich in flavour. A Chinese classic.',
      preparation: "chop it up, fry it up, try not to set your kitchen on fire."
  }
];
  
