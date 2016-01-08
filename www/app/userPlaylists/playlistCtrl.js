'use strict';

angular.module('youtube').controller('playlistCtrl', playlistCtrl);

playlistCtrl.$inject = ['$scope', 'playlistSvc', '$ionicLoading', '$state', 'storeSvc']

function playlistCtrl ($scope, playlistSvc, $ionicLoading, $state, storeSvc){
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner>'
  })

  if (!storeSvc.returnPlaylists('userPlaylists')){
    playlistSvc.getPlaylists(function (Playlists){
      storeSvc.savePlaylists('userPlaylists', Playlists);
      $scope.playlists = Playlists;
      $ionicLoading.hide();
    })
  }else{
    $scope.playlists = storeSvc.returnPlaylists('userPlaylists');
    $ionicLoading.hide();
  }

  $scope.showVideos = function(playlist){
    if(!playlist.videos){
      playlistSvc.getPlaylistVideos(playlist.id, function (responseObj){
        $scope.$apply(playlist.videos = responseObj.items);
        playlist.collapse = false;
      })
    }else{
      playlist.collapse=!playlist.collapse;
    }

  }

  $scope.play = function (playlistArray, idx){
    storeSvc.saveData(playlistArray);
    $state.go('player', {id:idx});
  }
}
