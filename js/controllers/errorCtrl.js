app.controller('errorCtrl', ['$scope', '$location','gPublicacionService', '$rootScope', function($scope, $location,gPublicacionService, $rootScope){

  var Usuario;
  if($rootScope.FBLogged){
    Usuario = $rootScope.FBCodUser;
  }else{
    Usuario = "Anonimo";
  }

  $scope.RegistrarError = function(){
    var promesa = gPublicacionService.reg_error({Direccion: $location.path(), CodUsuario:Usuario, Error: $scope.ErrorMdl});
    promesa.then();
    alert("Gracias por registrar el error, lo corregiremos en breve, ahora te redireccionaremos a la página principal");
    $location.path("/");
  }
  
}])