(function() {
   "use-strict";

   angular.module("UsersApp", [])
   .controller("AddController", AddController)
   .controller("ListController", ListController)
   .service("UserService", UserService);

   AddController.$inject = ["UserService"];
   function AddController(UserService) {
      var addctrl = this;

      addctrl.clear = function() {
         addctrl.firstName = "";
         addctrl.lastName = "";
         addctrl.login = "";
      }

      addctrl.addUser = function() {
         UserService.addUser(new User(addctrl.firstName, addctrl.lastName, addctrl.login))
         addctrl.clear();
      };

      addctrl.clear();
   }

   ListController.$inject = ["UserService"];
   function ListController(UserService) {
      var listctrl = this;
      listctrl.users = UserService.getAllUsers();

      listctrl.delUser = function (login) {
         UserService.delUser(login);
      }
   }

   function User(firstName, lastName, login) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.login = login;
   }

   function UserService() {
      var userService = this;
      userService.list = [];

      userService.getAllUsers = function() {
         return userService.list;
      }

      userService.addUser = function (user) {
         userService.list.push(user);
      }

      userService.delUser = function(login) {
         var idx = userService.list.findIndex(function (user) {
            return user.login === login;
         });
         if (idx >= 0) {
            userService.list.splice(idx, 1);
         }
      }
   }

})()
