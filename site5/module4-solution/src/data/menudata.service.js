// IIFE
(function() {

'use strict';

angular.module('Data')
.service("MenuDataService", MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {

  function getAllCategories() {
     var req = {
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/categories.json'
     };
     var promisse = $http(req);
     return promisse;
  }

  function getItemsForCategory(categoryShortName) {
     var req = {
       method: 'GET',
       url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName
     };
     var promisse = $http(req);
     return promisse;
  }

  var service = {
     getAllCategories: getAllCategories,
     getItemsForCategory: getItemsForCategory
  };
  return service;
}

// IIFE
})();
