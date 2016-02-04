'use strict';

angular.module('youtube').service('searchSvc', searchSvc);

function searchSvc (){
  var searches = JSON.parse(window.localStorage['recentSearches'] || '[]');

  this.saveSearch = function (query){
    query = query.toLowerCase();
    if (searches.indexOf(query) !== -1){
      return;
    }
    searches.push(query);
    window.localStorage['recentSearches'] = JSON.stringify(searches);
  }

  this.getRecentSearches = function (){
    return searches;
  }
}