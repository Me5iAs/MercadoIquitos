'use strict';
/**
* PapiroApp Module
*
* Description
*/
var app = angular.module('miapp', [
'ngRoute',
'ngAnimate',
'ui.bootstrap',
'angularFileUpload',
'textAngular',
'ngSanitize'
  ]);

// configurar router
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.    
    when('/home',{templateUrl:'views/home.html', controller:'categoriasCtrl'}).
    when('/vender',{templateUrl:'views/vender.html', controller:'venderCtrl'}).
    when('/registrar',{templateUrl:'views/registrar.html', controller:'loginCtrl'}).
    when('/result/:criterio/:pagina/:categoria/',{templateUrl:'views/resultados.html', controller:'resultadosCtrl'}).
    

    // when('/productos',{templateUrl:'views/productos.html', controller:'productosCtrl'}).
    // when('/solicitud',{templateUrl:'views/solicitud.html', controller:'solicitudCtrl'}).
    // when('/reg_personas',{templateUrl:'views/personas.html', controller:'personasCtrl'}).
    // when('/login',{templateUrl:'views/login.html', controller:'loginCtrl' });
    otherwise({redirectTo:'/home'});
}]);


// //configurar conexion a servicio
// app.config(['$httpProvider', function($httpProvider){    
//     $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*, text/javascript,application/javascript,text/html';
//     $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//     $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';    
// }]);


// app.run(function($rootScope,$location,gSessionService){
//     $rootScope.$on("$routeChangeStart",function(){
//         if (gSessionService.logged() == false){
//             $location.path("/login");
//         }else{
//             if($location.path()=="/login")
//             $location.path("/home");
//         }
    // var verSession = gSessionService.logged();
    // verSession.then(function(msg){
    //   // console.log(msg)
    //     if (!msg.data){     
    //         $location.path('/login');
    //     }else{
    //         if ($location.path()=='/login'){                    
    //           $location.path('/home');  
    //         }
    //     }
    // })
    // })
// })