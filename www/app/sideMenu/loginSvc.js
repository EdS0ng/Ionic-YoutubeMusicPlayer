'use strict';

angular.module('youtube').service('loginSvc', loginSvc);

loginSvc.$inject = ['$http'];

function loginSvc ($http){
  var clientId = 'YOUR_CLIENT_ID';
  var scopes = 'https://www.googleapis.com/auth/youtube'; 
  var clientSecret = 'YOUR_CLIENT_SECRET';

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  var refreshToken;

  this.oAuthLogin = function (cb){
    //for browser testing
    // gapi.auth.authorize({
    //   client_id: clientId, 
    //   scope: scopes, 
    //   immediate: false
    // }, function (authResult){
    //   if (authResult && !authResult.error) {
    //     var request = gapi.client.youtube.channels.list({
    //       part:'contentDetails, snippet',
    //       mine:true
    //     });
    //     request.execute(function (resp){
    //       cb(resp.items[0]);
    //     })
    //   }
    // }); 

    //for mobile use
    var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id='+clientId+'&redirect_uri=http://localhost/callback&scope='+scopes+'&response_type=code&access_type=offline', '_blank', 'location=no');

    ref.addEventListener('loadstart',  function (e){
      if((e.url).indexOf('http://localhost/callback')===0){
        var reqToken = (e.url).split('code=')[1];
        $http({method:'post', url:'https://accounts.google.com/o/oauth2/token', data: "client_id="+clientId+"&client_secret="+clientSecret+"&code="+reqToken+"&redirect_uri=http://localhost/callback&grant_type=authorization_code"})
        .success(function (data){
          refreshToken = data.refresh_token;
          gapi.auth.setToken({access_token: data.access_token, expires_in:data.expires_in});
          var request = gapi.client.youtube.channels.list({
            part:'contentDetails, snippet',
            mine:true
          });
          request.execute(function (resp){
            cb(resp.items[0]);
          })
        }).error(function (data, status){
          console.log(error);
        })
        ref.close();
      }
    })
  }
}

  
