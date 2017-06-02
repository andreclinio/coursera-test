// IIFE
(function() {

'use strict';

angular.module('Data')
.service("MenuDataService", MenuDataService)
.constant("BaseURL", "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'BaseURL'];
function MenuDataService($http, BaseURL) {

  function getAllCategories() {
     var req = {
        method: 'GET',
        url: BaseURL + '/categories.json'
     };
     var promisse = $http(req);
     return promisse;
  }

  function getItemsForCategory(categoryShortName) {
     var req = {
       method: 'GET',
       url: BaseURL + '/menu_items.json?category=' + categoryShortName
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
