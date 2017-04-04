(function() {
   "use-strict";

   angular.module("UsersApp", [])
   .controller("AddController", AddController)
   .controller("ListController", ListController)
   .provider("UserService", UserServiceProvider)
   .config(Config);

   Config.$inject = ['UserServiceProvider'];
   function Config(UserServiceProvider) {
      UserServiceProvider.defaults.maxItems = 2;
   }

   AddController.$inject = ["UserService"];
   function AddController(UserService) {
      var addctrl = this;

      addctrl.clear = function() {
         addctrl.firstName = "";
         addctrl.lastName = "";
         addctrl.login = "";
      }

      addctrl.addUser = function() {
         try {
            UserService.addUser(new User(addctrl.firstName, addctrl.lastName, addctrl.login))
            addctrl.clear();
            addctrl.errorMessage = null;
         }
         catch(error) {
            addctrl.errorMessage = error.message;
         }
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
