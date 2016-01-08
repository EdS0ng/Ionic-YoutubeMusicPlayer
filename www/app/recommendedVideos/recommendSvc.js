'use strict';

angular.module('youtube').service('recommendSvc', recommendSvc);

function recommendSvc (){
  this.getRecommendedVideos = function (cb){
    var request = gapi.client.youtube.activities.list({
      part:'snippet, contentDetails',
      maxResults: 10,
      home:true
    });
    request.execute(function (resp){
      cb(resp);
    })
  }
}