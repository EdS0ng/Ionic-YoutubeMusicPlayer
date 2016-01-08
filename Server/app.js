'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var emitter = require('./util/eventEmitter');

//CORS for browers testing
app.use(function (req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
})

//General Middleware
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

//Routes
app.use('/music', require('./routes/music'));

//Socket
// io.set('origins', 'http://localhost:8100');
io.on('connection', function (socket){

  socket.on('pause', function (){
    console.log('pause');
  })

  socket.emit('created');
  
  emitter.listener('start', function (){
    socket.emit('start');
  })

  emitter.listener('end', function (){
    socket.emit('end');
  })

})


server.listen(PORT);
