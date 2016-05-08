'use strict';
app.factory('gPublicacionService', ['$http', function($http){
    return {        
        publicar: function(publicacion){
          var promesa = $http.post('backend/registrar_publicacion.php?t=p&idmi='+sessionStorage.getItem("Idmi"), publicacion);
          return promesa;
        },

        devolver: function(IdPublicacion){
          var promesa = $http.post('backend/registrar_publicacion.php?t=d&IdPublicacion='+IdPublicacion);
          return promesa;
        },

        reg_error: function(vError){
          var promesa = $http.post('backend/registrar_publicacion.php?t=error',vError);
          return promesa;
        }
    };
}])