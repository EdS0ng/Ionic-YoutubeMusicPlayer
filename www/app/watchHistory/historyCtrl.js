'use strict';

angular.module('youtube').controller('historyCtrl', historyCtrl);

historyCtrl.$inject = ['$scope', 'storeSvc', 'historySvc', '$ionicLoading', '$state', '$stateParams'];

function historyCtrl ($scope, storeSvc, historySvc, $ionicLoading, $state, $stateParams){
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner>'
  })
  var playlistId = $stateParams.id;
  historySvc.getHistory(playlistId, function (videos){
    $scope.history = videos.items;
    $ionicLoading.hide();

    $scope.loadMore = function (){
      historySvc.searchMore(playlistId, videos, function (items){
        $scope.$apply($scope.history = items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
    
  })

  $scope.play = function (playlistArray, idx){
    storeSvc.saveData(playlistArray);
    $state.go('player', {q:playlistId, id:idx});
  }

}