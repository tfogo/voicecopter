/* jshint laxcomma: true, node: true */
"use strict";

var express = require('express')
  , http = require('http')
  , app = express()
  , routes = require('./routes')
  , arDrone = require('ar-drone')
  , client  = arDrone.createClient();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);
app.get('/takeoff', routes.takeoff(client));
app.get("/land", routes.land(client));

var server = http.createServer(app);
server.listen(process.env.PORT || 8000);
console.log('Express server started on port %s', server.address().port);
