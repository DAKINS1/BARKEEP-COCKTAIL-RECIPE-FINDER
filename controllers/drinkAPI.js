var db = require('../models');

module.exports = function(app, JsonField){

    app.get('/api', function(req, res){
        db.Drinks.findAll().then(function(data){
            // return res.data;
            console.log(data);
            res.end();
        })
    });

    app.post('/create', function(req, res){
        db.Drinks.create({
            drink_name: req.body.drinkName,
            jsonField:{
                ingredients:[req.body.ingredients]
            } 
        }).then(function(data){
            console.log('creates something');
            res.end();
        })
    })
}