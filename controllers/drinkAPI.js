var db = require('../models');
var bodyParser = require('body-parser');

function cleanData(ingredientArray, data) {
    var matchedIngredient = [];
    for (var obj in data) {
        var cleanedData = data[obj].dataValues.ingredients;
        for (var i = 0; i < ingredientArray.length; i++) {
            if (cleanedData.indexOf(ingredientArray[i]) !== -1) {
                matchedIngredient.push(data[obj].dataValues.drink_name);
            }
        }
    }
    console.log('/-----------------------------------------/');
    console.log(matchedIngredient);
    console.log('/-----------------------------------------/');
}

function ajaxCall(ingredientArray) {
    db.Drinks.findAll().then(function (data) {
        cleanData(ingredientArray, data);
    });
}

module.exports = function(app, JsonField){
    app.post('/create', function(req, res){
        console.log(req.body);
        var ingredientArray = [req.body.ingredient1, req.body.ingredient2, req.body.ingredient3, req.body.ingredient4];
        db.Drinks.create({
            drink_name: req.body.drink_name,
            ingredients: ingredientArray
        }).then(function(data){
            ajaxCall(ingredientArray);
            res.json(data);
            res.end();
        })
    })
}