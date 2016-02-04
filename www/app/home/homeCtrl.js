'use strict';

angular.module('youtube').controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', '$state', 'storeSvc', 'homeSvc', '$cordovaSplashscreen','socketObj'];

function homeCtrl ($scope, $state, storeSvc, homeSvc, $cordovaSplashscreen, socketObj){
  homeSvc.getPopularVideos(function (resp){
    $scope.videos = resp.items;
    
    $scope.loadMore = function (){
      homeSvc.searchMore(resp, function (items){
        $scope.$apply($scope.videos = items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    $cordovaSplashscreen.hide();
  });

  $scope.play = function (video){
    storeSvc.saveData(video);
    $state.go('player');
  }
}