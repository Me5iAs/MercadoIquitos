'use strict';

app.controller('venderCtrl', ['$scope', 'FileUploader', '$location', 'gQueryService','gSessionService','$rootScope', 'gPublicacionService', function($scope, FileUploader, $location, gQueryService,gSessionService,$rootScope,gPublicacionService) {
// inicio
  var _selected;
  $scope.selected = undefined;
  $scope.Categorias = [];
  $scope.Generales = [];
  
  $scope.Publicacion = {
    Titulo : "",
    Caracteristicas: {},
    Generales : {},
    Descripcion: "",
    Moneda: "S/",
    Precio: "1.00",
    Detalle: "",
    IdUsuario: "",
    Id: "0"
  }

  $scope.Login = function(){ gSessionService.logIn();}
  // validacion para publicar
  $scope.ActivoPublicar = function(){
    if($scope.Publicacion.Titulo =="" || $scope.Publicacion.Titulo ==undefined){return false;};
    if($scope.Publicacion.Precio=="" ||$scope.Publicacion.Precio ==undefined){return false;}
    if(!$scope.Publicacion.Categoria){return false;}
    var pasa = true;
    var result = $scope.Publicacion.Generales;
    $.each(result, function(k, v) {if(v==""){pasa = false;}});
    if($scope.Publicacion.Descripcion ==""){return false;};
    if(uploader.queue.length ==0){return false;}
    if (pasa == false){return false;}else{return true;}
  }

// Generales  
  $scope.CaracteristicasG = [];
    var promesa = gQueryService.sql({name:'sp_caracteristicas_devolver', datos:"0"});
    promesa.then(function(msg){
      if(msg.data.resultado!=''){
        $scope.CaracteristicasG = msg.data;        
        for(var i = 0; i<=$scope.CaracteristicasG.length-1; i++){
          $scope.Publicacion.Generales[$scope.CaracteristicasG[i].Caracteristica] = "";
          CargarDetalleGeneral($scope.CaracteristicasG[i].Id, i);
        }
      }
    });

  var CargarDetalleGeneral = function(Id, index){
    var promesa = gQueryService.sql({name:'sp_detalle_caracteristicas_devolver', datos:Id});
    promesa.then(function(msg){
      if(msg.data){        
        $scope.CaracteristicasG[index].Detalle = msg.data;
        // $scope.Publicacion.Generales[carac] = msg.data;
      }
    })
  }
  
// Especificas
  var promesa = gQueryService.sql({name:'sp_categorias_devolver'});
    promesa.then(function(msg){
      if(msg.data.resultado!=''){
         $scope.Categorias = msg.data;
      }
    });
  $scope.Caracteristicas = [];
  $scope.CargarCaracteristicas = function(IdCategoria){    
    $scope.Caracteristicas  = [];
    $scope.Publicacion.Caracteristicas ={};
    var promesa = gQueryService.sql({name:'sp_caracteristicas_devolver', datos:IdCategoria});
    promesa.then(function(msg){
      if(msg.data.resultado!=''){
         $scope.Caracteristicas = msg.data;         
      }
    });
  }
  $scope.EstadoDetalle = function(index){
    if($scope.Caracteristicas[index].Detalle){
      if($scope.Caracteristicas[index].Detalle.length > 0){
        return true;  
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  $scope.CargarDetalle = function(IdCarac, index, Caract){    
    $scope.Caracteristicas[index].Detalle = [];    
    var check = document.getElementsByName('Chk_'+IdCarac);    
    if (check[0].checked ==true){
      var promesa = gQueryService.sql({name:'sp_detalle_caracteristicas_devolver', datos:IdCarac});
      promesa.then(function(msg){
        if(msg.data.resultado!=''){
           $scope.Caracteristicas[index].Detalle = msg.data;
        }
      });
    }else{      
      delete $scope.Publicacion.Caracteristicas[Caract];
    }
  }
  
  $scope.SeleccionarDetalle = function(IdCarac){
    var sel = document.getElementsByName('sel_'+IdCarac);
    sel = sel[0].value;
    $scope.Publicacion.Caracteristicas.push(sel);    
  }

// uploader
  var uploader = $scope.uploader = new FileUploader({
    url: 'backend/upload.php?id='+ $scope.Publicacion.Id
  });
  uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
  });
  uploader.onBeforeUploadItem = function(item) {
    item.url= 'backend/upload.php?id='+ $scope.Publicacion.Id;
  };

  uploader.onCompleteAll = function() {
    alert("Su publicacion ha sido registrada con éxito");
    $location.path("confirma_pub/"+$scope.Publicacion.Id);
  };


// publicar
$scope.Publicar = function(){  
  // parsear detalle
  var detalle="";
  var result = $scope.Publicacion.Generales;
  $.each(result, function(k, v) {
    detalle = detalle + v + "@";
  });

  var result2 = $scope.Publicacion.Caracteristicas;
  $.each(result2, function(k, v) {
    detalle = detalle + v + "@";
  });
  $scope.Publicacion.Detalle = detalle;
  $scope.Publicacion.IdUsuario = sessionStorage.getItem('FBCodUser');
  var promesa = gPublicacionService.publicar($scope.Publicacion);
  promesa.then(function(msg){
    
    if(msg.data!=''){
      $scope.Publicacion.Id = msg.data;      
      console.log($scope.Publicacion.Id);
      // $scope.uploader.url = 'backend/upload.php?id=' + msg.data;
      // uploader.url = 'backend/upload.php?id=' + msg.data;
      // console.log($scope.uploader.url);
      uploader.uploadAll();     
    }
  });
}




//   servicios:
// Alquiler de inmuebles
// entretenimiento para eventos
// Gym, Spa y otros
// Restaurants
// Formación Académica
// Magia y Esoterismo
// mascotas perdidas
// venta de pasajes aereos
}]);
 