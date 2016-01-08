'use strict';

angular.module('youtube').service('laterSvc', laterSvc);

laterSvc.$inject = [];

function laterSvc (){
  
  this.getWatchLater = function (id, cb){
    var request = gapi.client.youtube.playlistItems.list({
      part:'snippet',
      playlistId: id,
      maxResults: 50
    })
    request.execute(function (resp){
      cb(resp);
    })
  }
}