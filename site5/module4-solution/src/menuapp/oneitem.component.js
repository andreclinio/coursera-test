// IIFE
(function() {

'use strict';

var module = angular.module('MenuApp');
module.component("oneItem", {
   templateUrl: 'src/menuapp/templates/oneitem.template.html',
   bindings: {
      theItem: '<',
   }
});


// IIFE
})();
