// publicacionCtrl
'use strict';

app.controller('publicacionCtrl', ['$scope', '$location', 'gPublicacionService','gSessionService','$rootScope','$routeParams', function($scope, $location, gPublicacionService,gSessionService,$rootScope,$routeParams){

  // Inicio
    // declarar variable publicacion
      $scope.Login = function(){ 
        gSessionService.logIn();   
      }
      $scope.Idpub = $routeParams.idPublicacion;
      $scope.Publicacion = {};
      $scope.Compra = {};
      $scope.Imagenes = [];
      $scope.TipoBarra = function(a){
        if(a <= 33.33){
          return "danger";
        }else if(a<=66.66){
          return "warning";
        }else{
          return "info";
        }
      }
      // $scope.Publicacion.img = [];

      $scope.Compra.Cantidad = 1;
      
      var currIndex = 0;
      var agregarImagenes = function(imge){
        
        $scope.Imagenes.push({
          image: 'img/publicaciones/'+ $scope.Idpub+'/'+imge,
          id: currIndex++
        });
      }

    // Cargar publicacion
      var promesa = gPublicacionService.devolver($routeParams.idPublicacion);
      promesa.then(function(msg){  
        if(msg.data.filas!='0'){        
          $scope.Publicacion = msg.data[0];
          var a = $scope.Publicacion.img.split("|");
          for (var x=0;x<a.length;x++){          
            agregarImagenes(a[x]);
          }
        }else{
          $location.path("/error_pub");
        }
      });
}]);
