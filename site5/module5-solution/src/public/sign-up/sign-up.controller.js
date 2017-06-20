(function() {

"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['User', 'UserService', '$state', 'menuItems'];
function SignUpController(User, UserService, $state, menuItems) {
  var ctrl = this;
  ctrl.menuItems = menuItems.menu_items;
  ctrl.favoriteId = ctrl.menuItems[0].id + "";


  ctrl.doLogin = function() {
    var item = getItem(ctrl.favoriteId);
    var user = new User(ctrl.firstName, ctrl.lastName, ctrl.email, ctrl.phoneNumber, item);
    UserService.doLogin(user);
    $state.go('public.myinfo');
  }

  function getItem(id) {
    for (var i = 0; i < ctrl.menuItems.length; i++) {
       var it = ctrl.menuItems[i];
      //  console.log(it);
       if (it.id == id) return it;
    }
    return null;
  }
}


})();
