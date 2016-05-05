// publicacionCtrl
'use strict';

app.controller('publicacionCtrl', ['$scope', '$location', 'gPublicacionService','gSessionService','$rootScope','$routeParams', function($scope, $location, gPublicacionService,gSessionService,$rootScope,$routeParams){

  // Inicio
    // declarar variable publicacion
      $scope.Idpub = $routeParams.idPublicacion;
      $scope.Publicacion = {};
      $scope.Compra = {};
      $scope.Imagenes = [];

      $scope.Compra.Cantidad = 1;

    // Cargar publicacion
      var promesa = gPublicacionService.devolver($routeParams.idPublicacion);
      promesa.then(function(msg){  
        if(msg.data.filas!='0'){        
          $scope.Publicacion = msg.data[0];
          var a = $scope.Publicacion.img.split("|");
          var b = [];
          var currIndex = 0;
          for (var x=0;x<a.length-1;x++){
            console.log(a[x]);
            b.push({
              image: 'img/files/'+ $scope.Idpub+'/'+a[x],
              id: currIndex++
            });            
          }


          // console.log($scope.Publicacion);
        }else{
          $location.path("/error_pub");
        }
      });
}]);
