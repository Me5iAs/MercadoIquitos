'use strict';


var app = angular

.module('app', ['ngRoute','angularFileUpload'])

.config(['$routeProvider',function($routeProvider) {
    $routeProvider.    
    when('/home',{templateUrl:'views/subir.html', controller:'UploadCtrl'}).
    // when('/productos',{templateUrl:'views/productos.html', controller:'productosCtrl'}).
    // when('/solicitud',{templateUrl:'views/solicitud.html', controller:'solicitudCtrl'}).
    // when('/reg_personas',{templateUrl:'views/personas.html', controller:'personasCtrl'}).
    // when('/login',{templateUrl:'views/login.html', controller:'loginCtrl' });
    otherwise({redirectTo:'/home'});
}]);

    // .controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {
    //     var uploader = $scope.uploader = new FileUploader({
    //         url: 'upload.php'
    //     });

    //     // FILTERS

    //     uploader.filters.push({
    //         name: 'imageFilter',
    //         fn: function(item /*{File|FileLikeObject}*/, options) {
    //             var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
    //             return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    //         }
    //     });

    //     // CALLBACKS

    //     uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    //         console.info('onWhenAddingFileFailed', item, filter, options);
    //     };
    //     uploader.onAfterAddingFile = function(fileItem) {
    //         console.info('onAfterAddingFile', fileItem);
    //     };
    //     uploader.onAfterAddingAll = function(addedFileItems) {
    //         console.info('onAfterAddingAll', addedFileItems);
    //     };
    //     uploader.onBeforeUploadItem = function(item) {
    //         console.info('onBeforeUploadItem', item);
    //     };
    //     uploader.onProgressItem = function(fileItem, progress) {
    //         console.info('onProgressItem', fileItem, progress);
    //     };
    //     uploader.onProgressAll = function(progress) {
    //         console.info('onProgressAll', progress);
    //     };
    //     uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //         console.info('onSuccessItem', fileItem, response, status, headers);
    //     };
    //     uploader.onErrorItem = function(fileItem, response, status, headers) {
    //         console.info('onErrorItem', fileItem, response, status, headers);
    //     };
    //     uploader.onCancelItem = function(fileItem, response, status, headers) {
    //         console.info('onCancelItem', fileItem, response, status, headers);
    //     };
    //     uploader.onCompleteItem = function(fileItem, response, status, headers) {
    //         console.info('onCompleteItem', fileItem, response, status, headers);
    //     };
    //     uploader.onCompleteAll = function() {
    //         console.info('onCompleteAll');
    //     };

    //     console.info('uploader', uploader);
    // }]);