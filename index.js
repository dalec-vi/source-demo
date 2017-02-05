var express = require('express')
var app = express()

var path = require('path');
var bodyParser = require('body-parser');
var nodeUrl = require('url');

var SDKHelper = require('./sourceApp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '/')))


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "/app/home.html"));
});

app.get('/url', function (req, res){
  SDKHelper.getList(function(list){
    var result = {};
    result.status = "OK";
    result.list = list;
    res.json(result);
  })
});

app.post('/url', function(req, res){

    var inputUrl = req.body.url;
    SDKHelper.inject(inputUrl, function(pageLink){
        var url = pageLink;
        var result = {};
        result.status = "OK";
        result.url = url;
        console.log(result);
        res.json(result);
    });
    
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
