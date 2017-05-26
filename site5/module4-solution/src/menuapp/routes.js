// IIFE
(function() {

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.otherwise('/');

   $stateProvider.state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
   });

   $stateProvider.state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/templates/categories.template.html'
   });



}


// IIFE
})();
