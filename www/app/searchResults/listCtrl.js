'use strict';

angular.module('youtube').controller('listCtrl', listCtrl);

listCtrl.$inject = ['$scope', 'storeSvc', '$stateParams', '$state', '$ionicLoading', 'listSvc'];

function listCtrl ($scope, storeSvc, $stateParams, $state, $ionicLoading, listSvc){
  
  $ionicLoading.show({
    template:'<ion-spinner></ion-spinner>'
  })
  listSvc.search($stateParams.q, function (resp){
    $scope.videos = resp.items;
    $ionicLoading.hide();

    $scope.loadMore = function (){
      listSvc.searchMore($stateParams.q, resp, function (items){
        $scope.$apply($scope.videos = items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

  })

  $scope.play = function (video){
    storeSvc.saveData(video);
    $state.go('player');
  }

}