app.controller('categoriasCtrl', ['$scope', 'gQueryService', function($scope,gQueryService){

// $scope.buscar = function(){
//   alert("a");
// }

  $scope.categorias = [

{Categoria:'Accesorios para Vehículos', link:'#/1'},
{Categoria:'Animales y Mascotas', link:'#/2'},
{Categoria:'Arte y Antigüedades', link:'#/3'},
{Categoria:'Cámaras y Accesorios', link:'#/4'},
{Categoria:'Celulares y Teléfonos', link:'#/5'},
{Categoria:'Coleccionables y Hobbies', link:'#/6'},
{Categoria:'Computación', link:'#/1'},
{Categoria:'Consolas y Videojuegos', link:'#/7'},
{Categoria:'Deportes y Fitness', link:'#/8'},
{Categoria:'Electrónica, Audio y Video', link:'#/9'},
{Categoria:'Hogar y Electrodomésticos', link:'#/10'},
{Categoria:'Industrias y Oficinas', link:'#/11'},
{Categoria:'Instrumentos Musicales', link:'#/12'},
{Categoria:'Juegos y Juguetes', link:'#/13'},
{Categoria:'Libros, Revistas y Comics', link:'#/14'},
{Categoria:'Música y Películas', link:'#/15'},
{Categoria:'Ropa, Relojes y Lentes', link:'#/16'},
{Categoria:'Otras categorías', link:'#/17'}
  ];
}])