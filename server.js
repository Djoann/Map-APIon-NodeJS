var express = require('express');
var path = require('path');
var http = require('http');
//var twitter = require('./routes/twitterClient');
var geoitem = require('./routes/geoitems');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()), app.use(express.static(path.join(__dirname,
            'public')));
    // app.use(express.bodyParser()),
    // app.use(express.static(path.join(__dirname,
    // '../')));
});

//app.get('/tw', twitter.getLastTweet);

app.get('/hello', function(req,res){
var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
app.get('/geoitems', geoitem.findAll);
// This line should be commented to work with static file.
//app.get('/data/data.json', geoitem.findAll);

//app.get('/geoitems/geo', geoitem.findByBounds);
app.post('/geoitems', geoitem.addGeoItem);
app.get('/geoitems/:id', geoitem.findById);
// app.put('/geoitems/:id', geoitem.updateGeoItem);
// app.delete('/geoitems/:id', geoitem.deleteGeoItem);
app.use(express.static('./public'));

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
