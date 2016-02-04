'use strict';

angular.module('youtube').factory('socketObj', ['$rootScope', '$http', function ($rootScope, $http) {
  var endpoint = 'Your Server Endpoint';
  var socketObj = {
    socket: io.connect(endpoint),
    events:[]
  };

  (function (){
    socketObj.socket.on('ping', function (){
      $http.get(endpoint+'/ping').then(function (){
      }, function (err){
        console.log(err);
      })
    })
  })();

  (function(){
    socketObj.socket.on('end', function (){
      console.log('download finished on server');
    })
  })(); 

  return socketObj;

}]);
