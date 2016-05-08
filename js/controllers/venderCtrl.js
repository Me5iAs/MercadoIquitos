'use strict';

app.controller('venderCtrl', ['$scope', 'FileUploader', '$location', 'gQueryService','gSessionService','$rootScope', 'gPublicacionService', function($scope, FileUploader, $location, gQueryService,gSessionService,$rootScope,gPublicacionService) {
  
  $scope.mostrar2 = function(){
    // console.log($rootScope);
    console.log($scope.Publicacion);
  }  
  $scope.mostrar = function(){
    console.log($rootScope);
    // console.log($scope.slides);
  }
// Publicacion.Imagenes
// iniciales
  // cokie
    var guid = function() {
     var d = new Date().getTime();
      if(window.performance && typeof window.performance.now === "function"){
          d += performance.now(); //use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;    
    };
    // IdMercadoIquitos
    var getIdmi = function (){    
      if (sessionStorage.getItem("Idmi")){
        return sessionStorage.getItem("Idmi");
      }else{
        sessionStorage.setItem('Idmi',guid());
        return sessionStorage.getItem("Idmi");
      }
    }

    var Idmi = getIdmi();
    
    var uploader = $scope.uploader = new FileUploader({
        url: 'backend/upload.php?idmi='+Idmi
    });

  // pasos
    $scope.PasoActual = 0;
    $scope.EstadoTab1 = true;
    $scope.EstadoTab2 = true;
    $scope.EstadoTab3 = true;
    $scope.EstadoTab4 = true;
    $scope.EstadoTab5 = true;

    // $scope.EstadoTab1 = false;
    // $scope.EstadoTab2 = false;
    // $scope.EstadoTab3 = false;
    // $scope.EstadoTab4 = false;
    // $scope.EstadoTab5 = false;

    // $scope.arch = "algo";
    $scope.CatNivel1 = "";
    $scope.CatNivel2 = "";
    $scope.CatNivel3 = "";
    $scope.CatNivel4 = "";

    $scope.nivel1 = [];
    $scope.nivel2 = [];
    $scope.nivel3 = [];
    $scope.nivel4 = [];
     
    var promesa = gQueryService.sql({name:'sp_categorias_devolver', datos:"0"});
    promesa.then(function(msg){  
      if(msg.data.resultado!=''){
         $scope.nivel1 = msg.data;    
      }
    });


$scope.Publicacion = {
  Titulo        :   '',
  CodCategoria  :   $scope.CatNivel4,
  Estado        :   'Nuevo',
  Descripcion   :   '',
  CantImg       :   0,
  Imagenes      :   [],
  Cantidad      :   '',
  Moneda        :   'S/',
  Precio        :   '',
  Efectivo      :   1,
  Deposito      :   0,
  Tarjeta       :   0,  
  Delivery      :   1,
  Recojo        :   1,
  IdUsuario     :   $rootScope.FBCodUser
};
$scope.publicando =false;
// inicio
  // $scope.CatNivel1="02000000";
  // $scope.CatNivel2="02010000";
  // $scope.CatNivel3="02010100";
  // $scope.CatNivel4="02010101";
  // var currIndx =0;
  // $scope.Publicacion = {
  //   Titulo        :   'Fotocopiadora Ricoh Mpc 2551 Full Color Duplex Printe',
  //   CodCategoria  :   '02010101',
  //   Estado        :   'Nuevo',
  //   Descripcion   :   '<p><b>FOTOCPIADORAS KIMSEB</b><br/><span id="selectionBoundary_1461182412829_9979789336028502" class="rangySelectionBoundary">&#65279;</span>VENTA DE FOTOCOPIADORAS MULTIFUNCIONALES<br/>IMPORTADAS NO USADAS EN EL PERÙ<br/>RICOH MPC 2551<br/>25 COPIAS POR MINUTO FLL COLOR<br/>FORMATO A3-A4<br/>SISTEMA DUPLEX<br/>AMPLIA AL 400 %<br/>REDUCE AL 25 %<br/>SISTEMA DUPLEX<br/>MULTICOPIA 1-999<br/>VISITE NUESTROS LOCALES<br/>ACEPTAMOS TARJETA VISA Y MASTERCARD<span id="selectionBoundary_1461182412828_19351140059261018" class="rangySelectionBoundary">&#65279;</span><br/></p>',
  //   Cantidad      :   '2',
  //   Imagenes      :   [],
  //   Moneda        :   'S/',
  //   Precio        :   '2400.00',
  //   Efectivo      :   1,
  //   Deposito      :   1,
  //   Tarjeta       :   1,
  //   Delivery      :   1,
  //   Recojo        :   1
  // };
  
  
  $scope.myInterval = 0;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.Publicacion.Imagenes = [];
  var currIndex = 0;

  $scope.addSlide = function(n) {
    // var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'img/files/'+ sessionStorage.getItem("Idmi")+'/'+n,
      id: currIndex++
    });
    $scope.Publicacion.CantImg++;
  };

  $scope.CantidadComprar = 1;
  if ($rootScope.FBLogged==true){
    $scope.UsuarioComprar = sessionStorage.getItem("FBUsuario");    
  }else{
    $scope.UsuarioComprar = "Anonimo";
  }
  // if(sessionStorage.getItem("FBUsuario")){
  //   $scope.UsuarioComprar = sessionStorage.getItem("FBUsuario");    
  // }else{
  //   $scope.UsuarioComprar = "Anonimo";
  // }

  $scope.Calificacion = 0.68;
  if($scope.Calificacion < 0.33){
    $scope.ClaseBarra = 'progress-bar-danger';
  }else if($scope.Calificacion < 0.66){
    $scope.ClaseBarra = 'progress-bar-warning';
  }else{
    $scope.ClaseBarra = 'progress-bar-success';
  }

  $scope.Cal = ($scope.Calificacion * 100) + "%";
  // for (var i = 0; i < 3; i++) {
  //   var a = i+1;
  //   $scope.addSlide(a);
  // }
  //  FBLogged

  // $scope.Publicacion.Imagenes.push({image: 'img/files/'+ sessionStorage.getItem("Idmi")+'/1', id: 1});
  // $scope.Publicacion.Imagenes.push({image: 'img/files/'+ sessionStorage.getItem("Idmi")+'/2', id: 2});
  // $scope.Publicacion.Imagenes.push({image: 'img/files/'+ sessionStorage.getItem("Idmi")+'/3', id: 3});

//tab2
  $scope.SelNivel1 = function(x){
    $scope.CatNivel1 = x;
    $scope.CatNivel2 = "";
    $scope.CatNivel3 = "";
    $scope.CatNivel4 = "";
    $scope.Publicacion.CodCategoria = '';
    $scope.nivel2 = [];
    $scope.nivel3 = [];
    $scope.nivel4 = [];
    var promesa = gQueryService.sql({name:'sp_categorias_devolver', datos:x});
    promesa.then(function(msg){    
      if(msg.data.resultado!=''){
         $scope.nivel2 = msg.data;    
      }
    });  
  }

  $scope.SelNivel2= function(x){  
    $scope.CatNivel2 = x;    
    $scope.CatNivel3 = "";
    $scope.CatNivel4 = "";  
    $scope.Publicacion.CodCategoria = '';
    $scope.nivel3 = [];
    $scope.nivel4 = [];

    var promesa = gQueryService.sql({name:'sp_categorias_devolver', datos:x});
    promesa.then(function(msg){    
      if(msg.data.resultado!=''){
         $scope.nivel3 = msg.data;    
      }
    });  
  }

  $scope.SelNivel3= function(x){  
    $scope.CatNivel3 = x;
    $scope.CatNivel4 = "";
    $scope.Publicacion.CodCategoria = '';
    $scope.nivel4 = [];
    var promesa = gQueryService.sql({name:'sp_categorias_devolver', datos:x});
    promesa.then(function(msg){    
      if(msg.data.resultado!=''){
         $scope.nivel4 = msg.data;    
      }
    });  
  }

  $scope.SelNivel4= function(x){    
    $scope.CatNivel4 = x;
    $scope.Publicacion.CodCategoria = x;
    // var promesa = gQueryService.sql({name:'sp_categorias_devolver', datos:x});
    // promesa.then(function(msg){    
    //   if(msg.data.resultado!=''){
    //      $scope.nivel4 = msg.data;    
    //   }
    // });  
  }

  $scope.pasar = function(x){
    $scope.PasoActual = x;
    if (x==0){
      $scope.EstadoTab1 = false;
      $scope.EstadoTab2 = true;
      $scope.EstadoTab3 = true;
      $scope.EstadoTab4 = true;
      $scope.EstadoTab5 = true;
    }else if(x==1){
      $scope.EstadoTab1 = true;
      $scope.EstadoTab2 = false;
      $scope.EstadoTab3 = true;
      $scope.EstadoTab4 = true;
      $scope.EstadoTab5 = true;
    }else if(x==2){
      $scope.EstadoTab1 = true;
      $scope.EstadoTab2 = true;
      $scope.EstadoTab3 = false;
      $scope.EstadoTab4 = true;
      $scope.EstadoTab5 = true;
    }else if(x==3){
      $scope.EstadoTab1 = true;
      $scope.EstadoTab2 = true;
      $scope.EstadoTab3 = true;
      $scope.EstadoTab4 = false;
      $scope.EstadoTab5 = true;
    }else{
      $scope.EstadoTab1 = true;
      $scope.EstadoTab2 = true;
      $scope.EstadoTab3 = true;
      $scope.EstadoTab4 = true;
      $scope.EstadoTab5 = false;
    }

  }

//tab3

  $scope.MostrarTab3BtnSiguiente = false;
  
  //Controlar que tenga ingresado el título

// subir


    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    
    var inicio=true;
    var currIndex = 0;
    // CALLBACKS
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        // console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
      fileItem.upload();
        // console.info('onAfterAddingFile', fileItem);
        // $scope.Publicacion.Imagenes.push({image: 'img/files/'+ sessionStorage.getItem("Idmi")+'/'+ uploader.queue.length, id: imgIndex++});
        // uploader.uploadFile();
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        // console.info('onAfterAddingAll', addedFileItems);
        // $scope.Publicacion.CantImg=uploader.queue.length;
        // $scope.Publicacion.Imagenes.push({image: 'img/files/'+ sessionStorage.getItem("Idmi")+'/'+ uploader.queue.length, id: imgIndex++})
        // uploader.uploadAll();
    };
    uploader.onBeforeUploadItem = function(item) {
        // console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        // console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        // console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {      
      $scope.addSlide(response);
      // $scope.Publicacion.Imagenes.push({image: 'img/files/'+ sessionStorage.getItem("Idmi")+'/'+response, id: currIndex++});
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        // console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        // console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        // console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        // console.info('onCompleteAll');
    };

    // console.info('uploader', uploader);

//tab5

//carrusell de imágenes
// var slides = $scope.slides = [];
// Publicacion.Imagenes
$scope.Login = function(){ 
  gSessionService.logIn();   
}

$scope.Publicar = function(){
  $scope.publicando = true;
  var promesa = gPublicacionService.publicar($scope.Publicacion);
  promesa.then(
    function(msg){
      if (msg.data){
        // console.log(msg.data);        
        sessionStorage.removeItem("Idmi");
        $location.path('/confirma_pub/'+ msg.data.resultado);
        // alert("Publicacion Finalizda");
        // $scope.publicando = true;  
      }else{
        $scope.publicando = false;
        alert ("error al publicar")
      }
    }
  );
}

}]);