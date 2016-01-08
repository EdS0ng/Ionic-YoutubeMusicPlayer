'use strict';

angular.module('youtube').service('playlistSvc', playlistSvc);

function playlistSvc (){

  this.getPlaylists = function (cb){
    var request = gapi.client.youtube.playlists.list({
      part: 'snippet, contentDetails',
      mine: true,
      maxResults:20
    })
    request.execute(function (response){
      cb(response.items);
    })
  }

  this.getPlaylistVideos = function (id, cb){
    var request = gapi.client.youtube.playlistItems.list({
      part: 'snippet',
      playlistId:id,
      maxResults:50
    })
    request.execute(function (response){
      cb(response);
    })
  }
}