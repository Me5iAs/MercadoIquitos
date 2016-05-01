'use strict';

app.controller('loginCtrl',['$scope', 'gSessionService','$rootScope', function($scope,gSessionService,$rootScope){
  var estadoSesion = sessionStorage.getItem("FBUsuario");
  if(estadoSesion){
    $rootScope.FBLogged = true;
    $rootScope.FBUsuario = sessionStorage.getItem('FBUsuario');
    $rootScope.FBCodUser = sessionStorage.getItem('FBCodUser');
    $rootScope.FBEmail = sessionStorage.getItem('FBEmail');
  }else{
    $rootScope.FBLogged = false;
  }
  
   // $rootScope.FBLogged = false;
  // gSessionService.logueado();

  $scope.Login = function(){    
    // $rootScope.FBLogged =true; 
    gSessionService.logIn();   
  }

  $scope.LogOut = function(){    
    // $rootScope.FBLogged =true; 
    gSessionService.logOut();   
  }
 
  
}]);