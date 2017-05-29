// IIFE
(function() {

'use strict';

var module = angular.module('MenuApp');
module.component("categories", {
   templateUrl: 'src/menuapp/templates/categories.template.html',
   bindings: {
      categoriesList: '<'
   }
});


// IIFE
})();
