'use strict';

angular.module('youtube').service('timerSvc', timerSvc);

timerSvc.$inject = ['$interval', '$rootScope'];

function timerSvc ($interval, $rootScope){
  var endingTime;
  var counter=0;
  var intervalPromise;

  this.returnDuration = function (){
    return endingTime;
  }
  this.resetTimer = function (){
    var endingTime = undefined;
    $interval.cancel(intervalPromise);
    counter = 0;
  }

  this.setDuration = function (duration){
    endingTime = Number(duration);
  }

  this.startTimer = function (){
    intervalPromise = $interval(timer, 1000,0, false);
  }

  this.pauseTimer = function (){
    $interval.cancel(intervalPromise);
  }

  function timer (){
    if (counter ===endingTime){
      $rootScope.$broadcast('finished');
      return;
    }
    counter++;
  }
}