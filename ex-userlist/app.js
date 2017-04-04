(function() {
   "use-strict";

   angular.module("UsersApp", [])
   .controller("UsersController", UsersController)
   .provider("UserService", UserServiceProvider)
   .config(Config);

   Config.$inject = ['UserServiceProvider'];
   function Config(UserServiceProvider) {
      UserServiceProvider.defaults.maxItems = 2;
   }

   UsersController.$inject = ["UserService"];
   function UsersController(UserService) {
      var ctrl = this;
      ctrl.users = UserService.getAllUsers();

      ctrl.clear = function() {
         ctrl.firstName = "";
         ctrl.lastName = "";
         ctrl.login = "";
      }

      ctrl.addUser = function() {
         try {
            UserService.addUser(new User(ctrl.firstName, ctrl.lastName, ctrl.login))
            ctrl.clear();
            ctrl.errorMessage = null;
         }
         catch(error) {
            ctrl.errorMessage = error.message;
         }
      };

      ctrl.delUser = function (login) {
         UserService.delUser(login);
         ctrl.errorMessage = null;
         ctrl.clear();
      }

      ctrl.clear();
   }

   function User(firstName, lastName, login) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.login = login;
   }

   function UserService(maxItems) {
      var service = this;
      service.list = [];
      service.maxItems = maxItems;

      service.getAllUsers = function() {
         return service.list;
      }

      service.addUser = function (user) {
         if (maxItems !== undefined && service.list.length >= maxItems) {
            throw new Error ("Max (" + maxItems + ") reached.")
         }
         service.list.push(user);
      }

      service.delUser = function(login) {
         var idx = service.list.findIndex(function (user) {
            return user.login === login;
         });
         if (idx >= 0) {
            service.list.splice(idx, 1);
         }
      }
   }

   function UserServiceProvider() {
      var provider = this;
      provider.defaults = {
         maxItems: 1,
      };
      provider.$get = function() {
         var service = new UserService(provider.defaults.maxItems)
         return service;
      }
   }
})()
