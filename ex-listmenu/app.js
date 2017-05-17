(function() {
   "use-strict";

   angular.module("MenuApp", [])
   .controller("MenuController", MenuController)
   .service("MenuService", MenuService)
   .constant("BaseURL", "https://davids-restaurant.herokuapp.com");

   MenuController.$inject = ["MenuService"];
   function MenuController(MenuService) {
      var ctrl = this;
      activate();

      function _fetchCategories() {
         var promisse = MenuService.getCategories();
         promisse.then(function(response){
            ctrl.categories = response.data;
            console.log("Fetch categories! ");
         })
         .catch(function(error) {
            console.log("Error: " + error);
            ctrl.categories = [];
         })
      }

      function _fetchMenuItems(categoryShortName) {
         var promisse = MenuService.getMenuItems(categoryShortName);
         promisse.then(function(response){
            ctrl.menu_items[categoryShortName] = response.data;
            console.log("Fetch menu items! (" + categoryShortName + ")");
         })
         .catch(function(error){
            ctrl.menu_items[categoryShortName] = [];
         })
      }

      function getCategories() {
         if (ctrl.categories === null) {
            ctrl.categories = [];
         }
         if (ctrl.categories.length === 0) {
            _fetchCategories()
         }
         return ctrl.categories;
      }

      function getMenuItems(categoryShortName) {
         if (ctrl.menu_items === null) {
            ctrl.menu_items = [];
         }
         var items = ctrl.menu_items[categoryShortName];
         if (items === null) {
            ctrl.menu_items[categoryShortName] = [];
            _fetchMenuItems(categoryShortName);
         }
         return ctrl.menu_items[categoryShortName]
      }

      function activate() {
         ctrl.categories = null;
         ctrl.menu_items = null;
         ctrl.getCategories = getCategories;
         ctrl.getMenuItems = getMenuItems;

         _fetchCategories();
         for (i = 0 ; i < ctrl.categories.length; i++) {
            var cat = ctrl.categories[i];
            var sn = cat.short_name
            _fetchMenuItems(sn)
         }
      }
   }

   MenuService.$inject = ["$http", "BaseURL"];
   function MenuService($http, BaseURL) {
      function getCategories() {
         var response = $http({
            method: "GET",
            url: (BaseURL + "/categories.json"),
         });
         return response;
      }

      function getMenuItems(categoryShortName) {
         var response = $http({
            method: "GET",
            url: (BaseURL + "/menu_itens.json"),
            params: {
               category: categoryShortName,
            }
         })
         return response;
      }

      var obj = {
         getCategories: getCategories,
         getMenuItems: getMenuItems,
      }
      return obj;
   }
})()
