var db = require('../models');

module.exports = function(app, path){

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '../views/index.html'));
    });

    app.get('/cocktails', function(req, res){
        res.sendFile(path.join(__dirname, '../views/cocktails.html'));
    });

    app.get('/form', function (req, res) {
        res.sendFile(path.join(__dirname, '../views/form.html'));
    });
}