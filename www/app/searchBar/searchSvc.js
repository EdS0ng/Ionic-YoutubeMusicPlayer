'use strict';

angular.module('youtube').service('searchSvc', searchSvc);

function searchSvc (){
  var searches = [];

  this.saveSearch = function (query){
    searches.push(query);
  }

  this.getRecentSearches = function (){
    return searches;
  }
}