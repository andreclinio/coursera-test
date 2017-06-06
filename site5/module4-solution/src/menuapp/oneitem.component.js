// IIFE
(function() {

'use strict';

var module = angular.module('MenuApp');
module.component("oneItem", {
   templateUrl: 'src/menuapp/templates/oneitem.template.html',
   bindings: {
      theItem: '<',
   },
   controller: OneItemComponentController,
});

//Just to test.
OneItemComponentController.$inject = ['$element'];
function OneItemComponentController($element) {
   var $ctrl = this;

   $ctrl.getItemName = function() {
      console.log("i", $ctrl.theItem);
      return $ctrl.theItem.name;
   }
}

// IIFE
})();
