var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var path = require('path');
var app = express();
var reqTest = require('./controllers/test');

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(jsonParser);

app.post('/test', reqTest);

app.listen(8010, function () {
    console.log('Start server');
});