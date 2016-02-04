'use strict';

angular.module('youtube').directive('mediaEvent', ['$parse','$state', '$stateParams','$ionicLoading','timerSvc', '$interval', function ($parse, $state, $stateParams, $ionicLoading, timerSvc, $interval){
  return{
    restrict: 'A',
    compile:function($element, attrs) {
              return function ngEventHandler(scope, element) {
                element.on('canplay', function(event) {              
                  $ionicLoading.hide();
                });
                element.on('playing', function (){                
                  timerSvc.startTimer();
                });
                element.on('pause', function (){
                  timerSvc.pauseTimer();
                })
                };
              }
  }
}])