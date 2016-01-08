'use strict';

angular.module('youtube').service('listSvc', listSvc);

function listSvc (){

  this.search = function (query, cb){
    var request = gapi.client.youtube.search.list({
      q:query,
      part:'snippet',
      type: 'video',
      maxResults: 20
    });
    request.execute(function (resp){
      cb(resp);
    })
  }

  this.searchMore = function (query, results, cb){
    console.log(results);
    var request = gapi.client.youtube.search.list({
      q:query,
      part:'snippet',
      type: 'video',
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

