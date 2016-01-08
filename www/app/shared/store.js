'use strict';

angular.module('youtube').service('storeSvc', storeSvc);

function storeSvc (){
  var dataStore={};

  this.saveData = function (data){
    dataStore.toBePlayed = data;
  }

  this.returnData = function (){
    return dataStore.toBePlayed;
  }
  this.savePlaylists  = function (key, data){
    dataStore[key] = data;
  }
  this.returnPlaylists = function (key){
    return dataStore[key];
  }
}