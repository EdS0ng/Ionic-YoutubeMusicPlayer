'use strict';

angular.module('youtube').controller('laterCtrl', laterCtrl);

laterCtrl.$inject = ['laterSvc', '$scope', 'storeSvc', '$ionicLoading', '$state', '$stateParams'];

function laterCtrl (laterSvc, $scope, storeSvc, $ionicLoading, $state, $stateParams){
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner>'
  })
  laterSvc.getWatchLater($stateParams.id, function (playlist){
    $scope.videos = playlist.items;
    $ionicLoading.hide();
  })
  
  $scope.play = function (playlistArray, idx){
    storeSvc.saveData(playlistArray);
    $state.go('player', {id:idx});
  }
}