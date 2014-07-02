var express = require('express');
var path = require('path');
var request = require('request');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000, function(){
  console.log('Exoplanet Visualizer is running on port 8000');
})

app.get('/planets', function(req, res){
  request('http://exoapi.com/api/skyhook/planets/all?fields=[disc_year]', function(err, response, body){
    if (!err && response.statusCode == 200){
      res.send(body);
    }
  });
})
