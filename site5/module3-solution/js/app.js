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
      showResume: '<',
      foundItems: '<',
      myTitle: '@title',
      onRemove: '&',
      showProgress: '<'
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

   function getHowManyItemsFound() {
      return foundctrl.foundItems.length;
   }

   function getAlertClass() {
      var n = getHowManyItemsFound();
      if (n === 0) {
         return 'alert-warning';
      }
      return 'alert-info';
   }

   function getAlertText() {
      var n = getHowManyItemsFound();
      if (n === 0) {
         return 'Nothing found!';
      }
      return 'Found #' + n + ' itens';
   }

   function activate() {
      foundctrl.getAlertClass = getAlertClass;
      foundctrl.getAlertText = getAlertText;
   }
   return foundctrl;
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
    narrowctrl.showResume = false;
    narrowctrl.title = null;
  }

  function onRemove(index) {
    narrowctrl.foundItems.splice(index, 1);
  }

  function search(searchTerm) {
     narrowctrl.showProgress = true;
     if (!searchTerm) {
        narrowctrl.title = "Asked for nothing!";
        narrowctrl.foundItems = [];
        narrowctrl.showResume = false;
        narrowctrl.showProgress = false;
        return;
     }
     var promisse = MenuSearchService.getMatchedMenuItems(searchTerm);
     promisse.then(
       function(data){
          narrowctrl.foundItems = data;
          narrowctrl.showResume = true;
          narrowctrl.title = 'Searched for "' + searchTerm + '"';
       },
       function(status) {
          narrowctrl.foundItems = [];
          narrowctrl.title = 'Failed for query"' + searchTerm + '" - status ' + status;
          narrowctrl.showResume = false;
       }
    ).finally(
       function() {
          narrowctrl.showProgress = false;
       }
    );
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
