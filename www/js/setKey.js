'use strict';

function handleClientLoad() {
  var apiKey = 'Your API Key Here';
  gapi.client.setApiKey(apiKey);
  gapi.client.load('youtube', 'v3').then(function() {
    console.log('gapi');
    angular.element(document).ready(function() {
      angular.bootstrap(document, ['youtube']);
    });
  });
}
