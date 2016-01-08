'use strict';

angular.module('youtube').service('likeSvc', likeSvc);

function likeSvc (){

  this.getSpecialPlaylist = function (id, cb){
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