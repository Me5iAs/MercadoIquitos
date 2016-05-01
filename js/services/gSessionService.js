'use strict';
app.factory('gSessionService', ['$rootScope','$http', 'gQueryService', function($rootScope,$http,gQueryService){
  var c = 0;
  var getFacebookData = function(){
    var auth =  FB.getAuthResponse();
    var promesa = $http.get('https://graph.facebook.com/v2.6/me?fields=id%2Cname%2Cbirthday%2Cemail&access_token='+auth.accessToken);
    promesa.then(
      function(msg){
        var response = msg.data;
        // console.log("login");
        $rootScope.FBLogged = true;
        $rootScope.FBUsuario = response.name;
        $rootScope.FBCodUser = response.id;
        $rootScope.FBEmail = response.email;
        sessionStorage.setItem('FBUsuario',response.name);
        sessionStorage.setItem('FBCodUser',response.id);
        sessionStorage.setItem('FBEmail',response.email);
        var promesa = gQueryService.sql({name:'fn_usuario_registrar', datos:response.id+"|"+ response.name+"|"+ response.email });
        promesa.then();  

        // $rootScope.$apply();
      }
    )
  };

    var ErrorLogin = function(){
      console.log("error login");
        $rootScope.FBLogged =false;
        $rootScope.FBUsuario ='';
        $rootScope.FBCodUser ='';
        $rootScope.FBEmail ='';
        sessionStorage.removeItem('FBUsuario');
        sessionStorage.removeItem('FBCodUser');
        sessionStorage.removeItem('FBEmail');
        // $rootScope.$apply();   
    }

    return {
      
      logueado: function(logged){
        if (window.FB){
          window.FB.getLoginStatus(function(response){
            if(response.status ==='connected'){
              getFacebookData();
            }else{
              ErrorLogin();
            }
          });
        }
      },

      logIn: function(){
        window.FB.getLoginStatus(function(data) {
          if (data.status !== 'connected') {
            window.FB.login(function(response) {
              if (response.status === 'connected'){
                getFacebookData();
              }else{
                 ErrorLogin();
              }                        
            }, {scope: 'public_profile,user_friends,email'});
          }else{
             getFacebookData();
          }
        })
      },

      logOut: function(){
         window.FB.logout(function(response){
          ErrorLogin();
          $rootScope.$apply();
         });
      }

    };
}])
