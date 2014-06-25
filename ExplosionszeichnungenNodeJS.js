/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var app = express();
var fs = require('fs');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res) {
    res.send('Hello from ExplosionszeichnungenNodeJS via Express.\n');
});

app.get('/select.php', function(req, res) {
    var file = null;
    if (req.query.motor) {
        file = __dirname + '/single.json';
    } else {
        file = __dirname + '/newjson.json';
    }
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.get('/insert.php', function(req, res) {
    res.send('insert.\n');
});

var server = app.listen(9080, function() {
    console.log('Listening on port %d', server.address().port);
});
