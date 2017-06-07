(function() {

'use strict';

angular.module('common')
.factory('User', UserFactory);

UserFactory.$inject = [];
function UserFactory() {

  function User(firstName, lastName, email, phoneNumber, favorite) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.favorite = favorite;
  }

  User.prototype.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
  };

  return User;
}



})();
