(function () {

'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['response'];
function ItemsController(response) {
  var vm = this;
  vm.itemsList = response.data.menu_items;
  vm.category = response.data.category;
  console.log(response);
}

})();
