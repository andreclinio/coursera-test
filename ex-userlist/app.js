(function() {
   "use-strict";

   angular.module("UsersApp", [])
   .controller("UsersController", UsersController)
   .directive("usersList", UsersListDirective)
   .provider("UsersService", UsersServiceProvider)
   .config(Config);

   function UsersListDirective() {
     var ddo = {
        restrict: 'E',
        templateUrl: "userlist.tmpl.html",
        scope: {
           users: "<",
           title: "@",
        },
        controller: UserListDirectiveController,
        controllerAs: "ctrl",
        bindToController: true,
     };
     return ddo;
   }

   function UserListDirectiveController() {
      var ctrl = this;
      ctrl.hasClinioInList = function () {
         for (var i = 0; i < ctrl.users.length; i++) {
            var login = ctrl.users[i].login;
            if (login.toLowerCase().indexOf("clinio") !== -1) {
               return true;
            }
         }
         return false;
      };
   }

   Config.$inject = ['UsersServiceProvider'];
   function Config(UsersServiceProvider) {
      UsersServiceProvider.defaults.maxItems = 2;
   }

   UsersController.$inject = ["UsersService"];
   function UsersController(UsersService) {
      var ctrl = this;
      ctrl.users = UsersService.getAllUsers();

      ctrl.clear = function() {
         ctrl.firstName = "";
         ctrl.lastName = "";
         ctrl.login = "";
      }

      ctrl.addUser = function() {
         try {
            UsersService.addUser(new User(ctrl.firstName, ctrl.lastName, ctrl.login))
            ctrl.clear();
            ctrl.errorMessage = null;
         }
         catch(error) {
            ctrl.errorMessage = error.message;
         }
      };

      ctrl.delUser = function (login) {
         UsersService.delUser(login);
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

   function UsersService(maxItems) {
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

   function UsersServiceProvider() {
      var provider = this;
      provider.defaults = {
         maxItems: 1,
      };
      provider.$get = function() {
         var service = new UsersService(provider.defaults.maxItems)
         return service;
      }
   }
})()
