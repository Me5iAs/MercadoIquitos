app.controller('resultadosCtrl', ['$scope', '$location', '$routeParams', 'gQueryService', "$uibModal", function($scope,$location, $routeParams, gQueryService,$uibModal){
  
$scope.buscar = function(){
  if(!$scope.criterio){
    alert("Ingrese lo que está buscando");
    $("#buscador").focus();
  }else{
    if ($location.path()!='/result'){
      $location.path('/result/' +$scope.criterio+ '/'+$scope.paginaActual +'/todas');
    }
  }
}

  
  $scope.paginaActual = 1;
  $scope.itemxpag = 2;
  $scope.maxSize = 15;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    // $log.log('Page changed to: ' + $scope.currentPage);
    $location.path('/result/' +$scope.criterio+ '/'+$scope.paginaActual +'/'  );
    $routeParams.pagina = $scope.paginaActual;
    alert($routeParams.pagina);
  };





$scope.resultados = [
{ Articulo:'Apple Iphone 1s 16 Gb "Desbloqueado De Fábrica" Blanco y Negro Gsm Smartphone', Precio: 100, Reputacion: 5, verificado: "No", codigo: 001, imagen:'1.jpg', comentario:'excelente estado0'},
{ Articulo:'Apple Iphone 2s 16 Gb "Desbloqueado De Fábrica" Blanco y Negro Gsm Smartphone', Precio: 100, Reputacion: 5, verificado: "No", codigo: 001, imagen:'1.jpg', comentario:'excelente estado0'},
{ Articulo:'Apple Iphone 3s 16 Gb "Desbloqueado De Fábrica" Blanco y Negro Gsm Smartphone', Precio: 100, Reputacion: 5, verificado: "No", codigo: 001, imagen:'1.jpg', comentario:'excelente estado0'},
{ Articulo:'Apple Iphone 4s 16 Gb "Desbloqueado De Fábrica" Blanco y Negro Gsm Smartphone', Precio: 100, Reputacion: 5, verificado: "No", codigo: 001, imagen:'1.jpg', comentario:'excelente estado0'},
{ Articulo:'Apple Iphone 5s 16 Gb "Desbloqueado De Fábrica" Blanco y Negro Gsm Smartphone', Precio: 100, Reputacion: 5, verificado: "No", codigo: 001, imagen:'1.jpg', comentario:'excelente estado0'},
{ Articulo:'Apple Iphone 6s 16 Gb "Desbloqueado De Fábrica" Blanco y Negro Gsm Smartphone', Precio: 100, Reputacion: 5, verificado: "No", codigo: 001, imagen:'1.jpg', comentario:'excelente estado0'},
{ Articulo:'Apple Iphone 7s 16 Gb "Desbloqueado De Fábrica" Blanco y Negro Gsm Smartphone', Precio: 100, Reputacion: 5, verificado: "No", codigo: 001, imagen:'1.jpg', comentario:'excelente estado0'}
  ];

$scope.listaOrden = ["Primeros en finalizar", "Más recientes en venta", "más barato primero", "Mas caro primero"];
$scope.listaVistas = ["Lista", "Galeria"];
$scope.vista = {
  orden: 2,
  vista: 0
};

$scope.filtro = [
{
  Titulo: "Categorias",
  items:  [
            'Celulares y accesorios',
            'Accesorios para teléfonos celulares',
            'Celulares y smartphones',
            'Otros en celulares y accesorios',
            'Piezas para celulares y smartphones',
            'Tarjetas SIM y tarjetas telefónicas'
          ]
},
{
  Titulo: "Categorias2",
  items:  [
            'Celulares y accesorios',
            'Accesorios para teléfonos celulares',
            'Celulares y smartphones',
            'Otros en celulares y accesorios',
            'Piezas para celulares y smartphones',
            'Tarjetas SIM y tarjetas telefónicas'
          ]
},
]

// los filtros deben venir desde la misma base de datos teniendo en consideración los datos de registro de cada tipo de artículo
// $scope.filtros = [
//   Categorias: ["cat1", "cat2"],
//   Caracteristicas: ["caracteristica1", "caracteristica2"],
// ]

}])