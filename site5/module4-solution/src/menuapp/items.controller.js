(function () {

'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['itemsList'];
function ItemsController(itemsList) {
  var vm = this;
  vm.itemsList = itemsList.data.menu_items;
  vm.category = itemsList.data.category;
  console.log(itemsList);
}

})();
