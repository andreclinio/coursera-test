// IIFE
(function() {

'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.otherwise('/');

   $stateProvider.state('home', {
      url: '/',
      templateUrl: 'src/menuapp/home.html'
   });

   $stateProvider.state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/categories.html',
      controller: 'CategoriesController as vm',
      resolve: {
          categoriesList: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories()
         }]
      }
   });



}


// IIFE
})();
