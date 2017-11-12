// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.get("/:date", function (request, response) {
  var dateParam = request.params.date;
  var obj
  if (Number.parseInt(dateParam, 10)) {
    obj = {"unix":dateParam, "natural":new Date(dateParam * 1000).toDateString()};
  }
  else if(Date.parse(dateParam)) {
    obj = {"unix":new Date(dateParam).getTime() / 1000, "natural":new Date(dateParam).toDateString()};
  }
  else {
    obj = {"unix":null, "natural":null};
  }
  
  
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(obj));
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
