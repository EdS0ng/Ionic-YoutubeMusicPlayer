'use strict';

angular.module('youtube').config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'app/home/home.html',
    controller: 'homeCtrl'
  })
  .state('about', {
    url:'/about',
    templateUrl:'app/about/about.html'
  })
  .state('list', {
    url:'/results/:q',
    params:{q:undefined},
    templateUrl:'app/searchResults/results.html',
    controller: 'listCtrl'
  })
  .state('search', {
    cache:false,
    url:'/search',
    templateUrl:'app/searchBar/search.html',
    controller:'searchCtrl'
  })
  .state('player', {
    cache: false,
    url:'/player/:id',
    params:{id:undefined},
    templateUrl:'app/player/player.html',
    controller: 'playerCtrl'
  })
  .state('playlists', {
    url: '/playlists',
    templateUrl: 'app/userPlaylists/playlist.html',
    controller: 'playlistCtrl'
  })
  .state('welcome', {
    url: '/welcome/:id',
    templateUrl:'app/recommendedVideos/recommend.html',
    controller: 'recommendCtrl'
  })
  .state('WatchLater', {
    url: '/later/:id',
    params:{id:undefined},
    templateUrl: 'app/watchLater/later.html',
    controller:'laterCtrl'
  })
  .state('Likes', {
    cache:false,
    url:'/liked/:id',
    params:{id:undefined},
    templateUrl: 'app/likesPlaylist/liked.html',
    controller: 'likeCtrl'
  })
  .state('WatchHistory', {
    url:'/history/:id',
    params:{id:undefined},
    templateUrl: 'app/watchHistory/history.html',
    controller: 'historyCtrl'
  })
});