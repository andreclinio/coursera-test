(function(){

angular.module('common')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['UserService', '$state'];
function MyInfoController(UserService, $state) {
  var ctrl = this;
  ctrl.hasLoggedUser = UserService.hasLoggedUser();
  ctrl.loggedUser = UserService.getLoggedUser();


  ctrl.doLogout = function() {
     UserService.doLogout();
     $state.go('public.home');
  }
}


})();
