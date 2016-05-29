app.controller('errorCtrl', ['$scope', '$location','gPublicacionService', '$rootScope','$routeParams', function($scope, $location,gPublicacionService, $rootScope, $routeParams){

  var Usuario;
  if($rootScope.FBLogged){
    Usuario = $rootScope.FBCodUser;
  }else{
    Usuario = "Anonimo";
  }

  $scope.RegistrarError = function(){
    var promesa = gPublicacionService.reg_error({Pagina: $routeParams.pagina, Codigo:$routeParams.codigo, CodUsuario:Usuario, Error: $scope.ErrorMdl});
    promesa.then();
    alert("Gracias por registrar el error, lo corregiremos en breve, ahora te redireccionaremos a la página principal");
    $location.path("/");
  }
  
}])