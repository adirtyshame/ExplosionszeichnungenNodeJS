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
    var motor = req.query.motor;
    
    if (motor == null) {
        console.log("empty request parameter 'motor'");
    } else if ( motor == 'MA') {
        file = __dirname + '/MA.json';
    } else if (motor == 'MS') {
        file = __dirname + '/MS.json';
    } 
    if (file == null) {
        console.log("empty request parameter 'motor'");
    } else {
        console.log('serving motor: ',motor);
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }
            res.send(data);
        });
    }
});

app.get('/insert.php', function(req, res) {
    res.send('insert.\n');
});

app.get('/engines/select.php', function(req, res) {
    var file = __dirname + '/engines.json';
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        console.log('read file ', file);
        res.send(data);
    });
});

var server = app.listen(9080, function() {
    console.log('Listening on port %d', server.address().port);
});
