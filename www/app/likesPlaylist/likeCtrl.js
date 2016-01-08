'use strict';

angular.module('youtube').controller('likeCtrl', likeCtrl);

likeCtrl.$inject = ['$scope', 'storeSvc', 'likeSvc', '$ionicLoading', '$state', '$stateParams'];

function likeCtrl ($scope, storeSvc, likeSvc, $ionicLoading, $state, $stateParams){
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner>'
  })
  var playlistId = $stateParams.id;
  likeSvc.getSpecialPlaylist(playlistId, function (playlistInfo){
    $scope.playlist = playlistInfo.items;
    $ionicLoading.hide();
  })

  $scope.play = function (playlistArray,idx){
    storeSvc.saveData(playlistArray);
    $state.go('player' , {id:idx});
  }
}