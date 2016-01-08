'use strict';

angular.module('youtube').service('historySvc', historySvc);

function historySvc (){

  this.getHistory = function (id, cb){
    var request = gapi.client.youtube.playlistItems.list({
      part:'snippet',
      playlistId: id,
      maxResults:20
    })
    request.execute(function (resp){
      cb(resp);
    })
  }

  this.searchMore = function (query, results, cb){
    var request = gapi.client.youtube.playlistItems.list({
      playlistId:query,
      part:'snippet',
      maxResults: 20,
      pageToken: results.nextPageToken
    });
    request.execute(function (resp){
      results.items = results.items.concat(resp.result.items);
      results.nextPageToken = resp.result.nextPageToken;
      cb(results.items);
    })
  }

}