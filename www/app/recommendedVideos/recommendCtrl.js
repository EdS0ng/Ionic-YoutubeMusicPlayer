'use strict';

angular.module('youtube').controller('recommendCtrl', recommendCtrl);

recommendCtrl.$inject = ['$stateParams', '$scope', 'recommendSvc', '$ionicLoading', 'storeSvc', '$state'];

function recommendCtrl ($stateParams, $scope, recommendSvc, $ionicLoading, storeSvc, $state){
  $scope.user = $stateParams.id;
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner>'
  })
  recommendSvc.getRecommendedVideos(function (response){
    $scope.videos = response.items.filter(function (video){
      return video.snippet.type ==='recommendation'
    })
    $ionicLoading.hide();
  });

  $scope.play = function (video){
    storeSvc.saveData(video);
    $state.go('player');
  }
}