'use strict';

angular.module('youtube').service('playerSvc', playerSvc);

playerSvc.$inject = ['$state', '$cordovaToast','timerSvc'];

function playerSvc ($state, $cordovaToast, timerSvc){

  // this.play = function (state){
  //   var player = document.getElementById('audioPlayer');
  //   if (state){
  //     player.play();
  //     return true;
  //   }else{
  //     player.pause();
  //     return false;
  //   }
  // }
  function toast (str, status){
    if (status.message){
      $cordovaToast.showShortCenter(status.message).then(function (success){
        //success
      }, function (error){
        console.log(error);
      });
    }else{
      $cordovaToast.showShortCenter(str+'d!').then(function (success){
        //success
      }, function (error){
        console.log(error);
      });
    }
  }

  this.insertIntoPlaylist = function (playlistId, videoId){
    console.log(playlistId, videoId);
    var request = gapi.client.youtube.playlistItems.insert({
      part:"snippet",
      resource:{
        "snippet":{
          "playlistId": playlistId,
          "resourceId": {
            "kind":"youtube#video",
            "videoId": videoId
          }
        }
      }
    })
    request.execute(function (resp){
      toast('adde', resp);
    })
  }

  this.getDuration = function (videoId){
    var request = gapi.client.youtube.videos.list({
      part:'contentDetails',
      id: videoId
    });
    request.execute(function (resp){
      //duration cleanup and send to timer
      var totalSeconds=0;
      var songLength = resp.items[0].contentDetails.duration;
      var hours=songLength.match(/(\d+)(?=H)/ig)||[];
      var minutes=songLength.match(/(\d+)(?=M)/ig)||[];
      var seconds =songLength.match(/(\d+)(?=S)/ig)||[];
      if (hours.length) {
        totalSeconds += Number(hours)*3600; 
      }
      if (minutes.length){
        totalSeconds += Number(minutes)*60;
      }
      if (seconds.length){
        totalSeconds += Number(seconds);
      }
      timerSvc.setDuration(totalSeconds);
    })
  }

  this.changeSong = function (index){
    $state.go('player', {id:index});
  }

  this.getRelatedVideos = function (videoId, cb){
    var request = gapi.client.youtube.search.list({
      relatedToVideoId: videoId,
      part:'snippet',
      type: 'video',
      maxResults: 50
    });
    request.execute(function (resp){
      cb(resp);
    })
  }

  this.rate = function (str, link){
    var request = gapi.client.youtube.videos.rate({
      id:link,
      rating:str
    });
    request.execute(function (status){
      toast(str, status);
    })
  }

}