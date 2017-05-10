(function() {
  'use-strict';

  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService)

  function Item(name, quantity, unit) {
     var obj = {
        name: name,
        quantity: quantity,
        unit: unit,
     };
   //   console.log(obj);
     return obj;
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
     var ctrl = this;
     activate();

     function activate() {
       ctrl.hasSomethingToBuy = hasSomethingToBuy;
       ctrl.getToBuyList = getToBuyList;
       ctrl.buy = buy;
     }

     function hasSomethingToBuy() {
        return ShoppingListCheckOffService.hasSomethingToBuy();
     }

     function getToBuyList() {
        return ShoppingListCheckOffService.getToBuyList();
     }

     function buy(index) {
        return ShoppingListCheckOffService.buy(index);
     }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
     var ctrl = this;
     activate();

     function activate() {
        ctrl.hasSomethingBought = hasSomethingBought;
        ctrl.getBoughtList = getBoughtList;
        ctrl.forget = forget;
        ctrl.getNumItemsBought = getNumItemsBought;
     }

     function getNumItemsBought() {
       return ctrl.getBoughtList().length;
     }

     function hasSomethingBought() {
        return ShoppingListCheckOffService.hasSomethingBought();
     }

     function getBoughtList() {
        return ShoppingListCheckOffService.getBoughtList();
     }

     function forget(index) {
        return ShoppingListCheckOffService.forget(index);
     }
  }


  function ShoppingListCheckOffService() {
     var toBuyList = [
             new Item("Cookies", 2, "bag"),
             new Item("Pepsi", 1, "bottle"),
             new Item("Ham", 3, "kilo"),
             new Item("Bread", 5, "pieces"),
             new Item("Chocolate", 1, "bar"),
             new Item("Cheese", 2, "pieces"),
     ];
     var boughtList = [];

     function getToBuyList() {
       return toBuyList;
     }

     function hasSomethingToBuy() {
        return toBuyList.length > 0;
     }

     function hasSomethingBought() {
        return boughtList.length > 0;
     }

     function getBoughtList() {
        return boughtList;
     }

     function buy(index) {
        if (index < 0 || index >= toBuyList.length) {
           throw new Error("Bad index for buying!");
        }
        var items = toBuyList.splice(index, 1);
        var item = items[0];
        boughtList.push(item);
     }

     function forget(index) {
        if (index < 0 || index >= boughtList.length) {
           throw new Error("Bad index for forgetting!");
        }
        var items = boughtList.splice(index, 1);
        var item = items[0];
        toBuyList.push(item);
     }

     return {
        hasSomethingToBuy: hasSomethingToBuy,
        hasSomethingBought: hasSomethingBought,
        getToBuyList: getToBuyList,
        getBoughtList: getBoughtList,
        buy: buy,
        forget: forget,
     }
  }


})()
