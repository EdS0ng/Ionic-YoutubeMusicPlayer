'use strict';

angular.module('youtube').controller('sideMenuCtrl', sideMenuCtrl);

sideMenuCtrl.$inject = ['$scope', 'loginSvc', '$state', 'storeSvc'];

function sideMenuCtrl ($scope, loginSvc, $state, storeSvc){
  $scope.OAuthLogin = function (){
    loginSvc.oAuthLogin(function (accInfo){
      var playlistIds = accInfo.contentDetails.relatedPlaylists;
      storeSvc.savePlaylists('watchLater', playlistIds.watchLater);
      $scope.playlists = {Likes: playlistIds.likes, WatchHistory: playlistIds.watchHistory, WatchLater: playlistIds.watchLater};
      $scope.loggedIn = true;
      $state.go('welcome', {id:accInfo.snippet.title})
    });
  }

  $scope.loggedIn = false;

  $scope.goAbout = function (){
    $state.go('about');
  }

  $scope.goPlaylist = function (){
    $state.go('playlists');
  }

  $scope.changeState = function (name, id){
    $state.go(name, {id:id});
  }

}