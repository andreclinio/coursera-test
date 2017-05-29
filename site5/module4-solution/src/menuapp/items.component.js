// IIFE
(function() {

'use strict';

var module = angular.module('MenuApp');
module.component("items", {
   templateUrl: 'src/menuapp/templates/items.template.html',
   bindings: {
      itemsList: '<',
      category: '<'
   }
});


// IIFE
})();
