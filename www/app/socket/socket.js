'use strict';

angular.module('youtube').factory('socketObj', ['$rootScope', function ($rootScope) {
  var socketObj = {
    socket: io.connect('YOUR_SERVER_DOMAIN'),
    events:[]
  };

  (function (){
    socketObj.socket.on('created', function (){
      console.log('created');
    })
  })();

  (function(){
    socketObj.socket.on('end', function (){
      console.log('download finished on server');
    })
  })(); 

  (function(){
    socketObj.socket.on('start', function (){
      console.log('data');
    })
  })(); 

  return socketObj;

}]);
