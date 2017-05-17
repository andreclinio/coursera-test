(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: 'E',
    scope: {
      isSearching: '<',
      foundItems: '<',
      myTitle: '@title',
      onRemove: '&',
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundctrl',
    bindToController: true,
  };
  return ddo;
}

function FoundItemsDirectiveController() {
   var foundctrl = this;
   activate();
   function activate() {
   }
}




// Controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowctrl = this;
  activate();

  function activate() {
    narrowctrl.search = search;
    narrowctrl.onRemove = onRemove;
    narrowctrl.clear = clear;

    clear();
  }

  function clear(index) {
    narrowctrl.foundItems = [];
    narrowctrl.searchTerm = null;
    narrowctrl.isSearching = false;
    narrowctrl.title = null;
  }

  function onRemove(index) {
    narrowctrl.foundItems.splice(index, 1);
  }

  function search(searchTerm) {
     var promisse = MenuSearchService.getMatchedMenuItems(searchTerm);
     promisse.then(
       function(data){
          narrowctrl.foundItems = data;

       },
       function(status) {
          console.log("Falha code: ", status);
          narrowctrl.foundItems = [];
       }
    );
    narrowctrl.isSearching = true;
    narrowctrl.title = 'Searched for "' + searchTerm + '"';
  }

  function getFoundItems() {
    var items = narrowctrl.foundItems
    console.log("found: " + items)
    return items;
  }
}


// Service
MenuSearchService.$inject = ['$http', '$q'];
function MenuSearchService($http, $q) {
  var service = {
     getMatchedMenuItems: getMatchedMenuItems
  };

 function getFilterPromisse(reqPromisse, searchTerm) {
    var promisse = $q(function(resolve, reject) {
      reqPromisse.then(function(response) {
        var rawData = response.data;
        var data = rawData.menu_items;
        var list = data.filter(function(elem) {
           return elem.description.includes(searchTerm);
        });
        resolve(list);
      },
      function (response){
        reject(response.status);
      });
   });
   return promisse;
 }

 function getMatchedMenuItems(searchTerm) {
    var reqPromisse = getRequestPromisse();
    var promisse = getFilterPromisse(reqPromisse, searchTerm);
    return promisse;
 }

 function getRequestPromisse() {
     var req = {
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
     };
     var reqPromisse = $http(req);
     return reqPromisse;
  }

  return service;
}



})();
