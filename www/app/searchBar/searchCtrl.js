'use strict';

angular.module('youtube').controller('searchCtrl', searchCtrl);

searchCtrl.$inject = ['$state', '$scope', '$ionicHistory', 'searchSvc'];

function searchCtrl ($state, $scope, $ionicHistory, searchSvc){

  document.getElementById('searchField').focus();

  $scope.searches = searchSvc.getRecentSearches();
  
  $scope.back = function (){
    $ionicHistory.goBack();
  }

  $scope.search = function (query){
    $state.go('list', {q:query});
  }

  $scope.checkEnter = function (keyEvent, query){
    if (keyEvent.keyCode == 13) {
      searchSvc.saveSearch(query);
      $state.go('list', {q:query});
    }
  }
  

}
