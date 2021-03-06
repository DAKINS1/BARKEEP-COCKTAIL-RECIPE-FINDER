var db = require('../models');


/**
 * @function cleanData
 * @param {*} ingredientArray The list of ingredients posted from the form
 * @param {*} data Data returned from the db.drinks.findall()
 * @param {*} drink_name The drinks name
 * Function consumes the data from findData()
 * for each object in data we store the ingredients array to ingredients list
 */
function cleanData(ingredientArray, data, drink_name) {
    var matchedNames = [];
    /**
     * @forloop
     * A loop to iterate of each drink stored in the database
     */
    for (var obj in data) {
        /**
         * @var drinkIngredientList The list of each drinks in ingredients from the database
         * @var drink_name The name of the drink with the matching queried ingredient
         */
        var drinkIngredientList = data[obj].dataValues.ingredients,
            drink_name;
        /**
         * @forloop
         * Loop over each item posted to the ingredient array
         * The array sent from the from
         */
        for (var i = 0; i < ingredientArray.length; i++) {
            // if ingredient sent from the form
            // exists in the drinks list of ingredients
            if (drinkIngredientList.indexOf(ingredientArray[i]) !== -1) {
                // if drink_name does not equal
                // the matching ingredients drink_name
                if (drink_name !== data[obj].dataValues.drink_name) {
                    // assign drink_name to the drink that has the matching ingredient
                    drink_name = data[obj].dataValues.drink_name;
                    // push the matched names to an array
                    // matchedNames.push(data[obj].dataValues.drink_name);

                    // TODO PUSH NAME AND URL
                    matchedNames.push({
                        name: data[obj].dataValues.drink_name,
                        ingredients: data[obj].dataValues.ingredients,
                        url: data[obj].dataValues.url
                    });

                }

            }

        }

    }

    // log(matchedNames)

    return matchedNames;
}


/**
 * @function
 * @param {*} ingredientArray The list of ingredients posted from the form
 * @param {*} drink_name drink_name The drinks name
 */
function findData(ingredientArray, drink_name) {

    return db.Drinks.findAll().then(function (data) {

        return cleanData(ingredientArray, data, drink_name);

    });

}

module.exports = function (app, JsonField) {

    app.post('/findDrink', function (req, res) {
        /**
         * @var ingredientArray The return ingredients from the form post
         */
        var ingredientArray = req.body.ingredients;

        findData(ingredientArray, req.body.drink_name).then( function(data) {

            res.json(data);

        });
    })

  // POST route for saving a new drink
      app.post('/add', function(req, res) {
        // create takes an argument of an object describing the drink we want to
        // insert into our table.

        db.Drinks.create({
          drink_name: req.body.drink_name,
          ingredients: req.body.ingredients,
          url: req.body.url

        }).then(function(data) {
          // We have access to the new drink as an argument inside of the callback function
          res.json(data);
        });
    })

}


function log(msg) {
    console.log('/-----------------------------------------/');
    console.log(msg);
    console.log('/-----------------------------------------/');
}