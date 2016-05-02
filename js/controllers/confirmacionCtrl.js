app.controller('confirmacionCtrl', ['$scope', '$routeParams', function($scope,$routeParams){

  $scope.enlace ='#/publicacion/:'+ $routeParams.idPublicacion;

}])