'use strict';

angular.module('youtube').controller('playerCtrl', playerCtrl);

playerCtrl.$inject = ['$scope', 'playerSvc', '$stateParams', 'storeSvc', '$sce', '$state', 'socketObj','$ionicLoading','timerSvc','playlistSvc'];

function playerCtrl ($scope, playerSvc, $stateParams, storeSvc, $sce, $state, socketObj, $ionicLoading, timerSvc, playlistSvc){
  
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner>'
  })
  var songs = storeSvc.returnData();

  if (!storeSvc.returnPlaylists('userPlaylists')){
    playlistSvc.getPlaylists(function (Playlists){
      storeSvc.savePlaylists('userPlaylists', Playlists);
      $scope.userPlaylists = Playlists;
    })
  }else{
    $scope.userPlaylists = storeSvc.returnPlaylists('userPlaylists');
  }

  if ($stateParams.id !== ''){
    var link = songs[$stateParams.id].snippet.resourceId.videoId;
    var lastSongPos = songs.length-1;
    var nextIdx = Number($stateParams.id)+1;
    var previousIdx = Number($stateParams.id)-1;

    $scope.playlist = true;
    $scope.playlistArray = songs;
    $scope.song = songs[$stateParams.id];

    if ($stateParams.id ==lastSongPos){
      $scope.disableNext = true;
    }
    if ($stateParams.id == 0){
      $scope.disablePrevious = true;
    }

    $scope.next = function (){
      playerSvc.changeSong(nextIdx);
    }
    $scope.previous = function (){
      playerSvc.changeSong(previousIdx);
    }
    $scope.$on('finished', function (){
      $scope.next();
    })
  }else{
    if (songs.id.videoId){
      var link = songs.id.videoId;
    }else{
      var link = songs.id;
    }
    $scope.song = songs;
  }

  $scope.watchLater = storeSvc.returnPlaylists('watchLater');
  $scope.playlistState = false;
  $scope.vidId = $sce.trustAsResourceUrl('Your_Server_Domain/music/'+link);

  playerSvc.getDuration(link);
  playerSvc.getRelatedVideos(link, function (resp){
    $scope.videos = resp.items;
  });

  $scope.$on('$ionicView.leave',function (){
    timerSvc.resetTimer();
  })

  $scope.addToPlaylist = function (playlistId){
    playerSvc.insertIntoPlaylist(playlistId, link);
  }

  $scope.play = function (video){
    storeSvc.saveData(video);
    $state.transitionTo($state.current, {}, {reload:true, inherit: false, notify:true});
  }

  $scope.rate = function (str){
    playerSvc.rate(str, link);
  }

  $scope.playPlaylistVideo = function (idx){
    $state.transitionTo($state.current, {id:idx}, {reload:true, inherit: false, notify:true});
  }
  $scope.togglePlaylists = function (){
    $scope.playlistState = !$scope.playlistState;
  }
}
