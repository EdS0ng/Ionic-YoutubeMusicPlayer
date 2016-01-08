'use strict';

angular.module('youtube').service('homeSvc', homeSvc);

function homeSvc (){
  this.getPopularVideos = function (cb){
    var request = gapi.client.youtube.videos.list({
      part:'snippet, contentDetails',
      regionCode:'US',
      chart:'mostPopular',
      maxResults:10
    })
    request.execute(function (resp){
      cb(resp);
    })
  }

  this.searchMore = function (results, cb){
    var request = gapi.client.youtube.videos.list({
      part:'snippet, contentDetails',
      regionCode: 'US',
      maxResults: 10,
      chart: 'mostPopular',
      pageToken: results.nextPageToken
    });
    request.execute(function (resp){
      results.items = results.items.concat(resp.result.items);
      results.nextPageToken = resp.result.nextPageToken;
      cb(results.items);
    })
  }
}