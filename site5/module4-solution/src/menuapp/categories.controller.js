(function () {

'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['response'];
function CategoriesController(response) {
  var vm = this;
  vm.categoriesList = response.data;
}

})();
