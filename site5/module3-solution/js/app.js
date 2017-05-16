(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundctrl',
    bindToController: true,
  };
  return ddo;
}

function FoundItemsDirectiveController() {
   var foundctrl = this;
}


// Controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowctrl = this;
  activate();

  function activate() {
    narrowctrl.search = search;
  }

  function search(searchTerm) {
     console.log('Searching: ', searchTerm)
     var promisse = MenuSearchService.getMatchedMenuItems(searchTerm);
     promisse.then(
       function(data){
          ctrl.found = data;
          console.log('data', data);
       },
       function(status) {
          console.log("Falha code: ", status);
          ctrl.found = [];
       }
    );
  }
}


// Service
MenuSearchService.$inject = ['$http', '$q'];
function MenuSearchService($http, $q) {
  var service = {
     getMatchedMenuItems: getMatchedMenuItems
  };

 function getMatchedMenuItems(searchTerm) {
    var reqPromisse = getRequestPromisse();
    var promisse = reqPromisse.then(function(response) {
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