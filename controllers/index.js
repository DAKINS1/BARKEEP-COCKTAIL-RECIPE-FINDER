var db = require('../models');

module.exports = function(app, path){

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '../views/index.html'));
    });

    app.get('/getmixing', function(req, res){
        res.sendFile(path.join(__dirname, '../views/getMixing.html'));
    });

    app.get('/find', function(req, res){
    res.sendFile(path.join(__dirname, '../views/find.html'));
    });

    app.get('/add', function(req, res){
    res.sendFile(path.join(__dirname, '../views/add.html'));
    });

}