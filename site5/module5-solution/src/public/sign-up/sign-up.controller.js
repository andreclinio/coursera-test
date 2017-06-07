(function() {

"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['User', 'UserService', '$state', 'menuItems'];
function SignUpController(User, UserService, $state, menuItems) {
  var ctrl = this;
  ctrl.menuItems = menuItems.menu_items;

  ctrl.doLogin = function() {
    console.log("FAV", ctrl.favorite);
    var item = getItem(ctrl.favorite);
    var user = new User(ctrl.firstName, ctrl.lastName, ctrl.email, ctrl.phoneNumber, item);
    UserService.doLogin(user);
    $state.go('public.myinfo');
  }

  function getItem(id) {
    for (var i = 0; i < ctrl.menuItems.length; i++) {
       var it = ctrl.menuItems[i];
       console.log(it);
       if (it.id == id) return it;
    }
    return null;
  }
}


})();
