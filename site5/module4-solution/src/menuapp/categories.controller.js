(function () {

'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['categoriesList'];
function CategoriesController(categoriesList) {
  var vm = this;
  vm.categoriesList = categoriesList.data;
}

})();
