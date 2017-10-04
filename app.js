var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var JsonField = require("sequelize-json");
var db = require('./models');

var port = process.env.PORT || 8000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require('./controllers')(app, path);
require('./controllers/drinkAPI.js')(app, JsonField);

var dropTable = {force: true};

db.sequelize.sync().then(function(){
    app.listen(port, function(){
        console.log('http://localhost:%s', port);
    });
});