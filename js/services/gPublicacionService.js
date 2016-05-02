'use strict';
app.factory('gPublicacionService', ['$http', function($http){
    return {        
        publicar: function(publicacion){
          var promesa = $http.post('backend/registrar_publicacion.php?idmi='+sessionStorage.getItem("Idmi"), publicacion);          
          return promesa;
        }        
    };
}])