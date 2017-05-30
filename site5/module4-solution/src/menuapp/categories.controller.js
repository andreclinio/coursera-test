(function () {

'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['response'];
function CategoriesController(response) {
  var vm = this;
  console.log(response.status);
  vm.categoriesList = response.data;
}

})();
