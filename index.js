var express = require('express')
var app = express()

var path = require('path');
var bodyParser = require('body-parser');
var nodeUrl = require('url');

var SDKInjector = require('./sourceApp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '/')))


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "/home.html"));
});

app.get('*', function (req, res) {
  res.redirect('/');
});

app.post('/', function(req, res){

    var inputUrl = req.body.url;
    SDKInjector.inject(inputUrl, function(pageLink){
        var html = "localhost:3000/" + pageLink;
        //console.log(html);

        res.send(html);
        //res.send(html);
    });
    
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
