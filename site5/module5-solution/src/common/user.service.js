(function() {

'use strict';

angular.module('common')
.service("UserService", UserService);

UserService.$inject = ['User'];
function UserService(User) {
  var loggedUser = null;

  function doLogin(user) {
    loggedUser = user;
  };

  function doLogout() {
    loggedUser = null;
  }

  function getLoggedUser() {
    return loggedUser;
  }

  function hasLoggedUser() {
     return loggedUser != null;
  }

  var service = {
     doLogin: doLogin,
     doLogout: doLogout,
     getLoggedUser: getLoggedUser,
     hasLoggedUser: hasLoggedUser
  };
  return service;
}


})();
