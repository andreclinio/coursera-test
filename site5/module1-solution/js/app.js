(function() {
  'use-strict';

  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController)

  LunchCheckController.$inject = ['$scope']
  function LunchCheckController($scope) {
     var ctrl = $scope;
     activate();

     function clear() {
       ctrl.list = "";
       ctrl.message = "";
       ctrl.remark = "";
       ctrl.count = 0;
     }

     function check() {
        var text = ctrl.list;
        if (!text) {
           ctrl.message = "No data! Nothing? On a diet?!";
           ctrl.count = 0;
           ctrl.remark = "";
           return;
        }

        var list = text.split(",");
        var remark = "";
        
        var discount = 0;
        for (var i = 0; i < list.length; i++) {
           var tmp = list[i];
           tmp = tmp.trim();
           if (list[i] !== tmp) { 
              remark += "Not consider spaces in item #" + (i+1) + " [" + tmp + "]; ";
           }
           if (!tmp) { 
              remark += "Empty item detected in ittem #" + (i+1) + " (discount); ";
              discount++;
           } 
           list[i] = tmp;
           console.log(list[i]);
        }

        ctrl.count = list.length - discount;
        ctrl.remark = remark;
        if (ctrl.count === 0) {
           ctrl.message = "No items!";
        }
        else {
           if (ctrl.count <= 3) {
              ctrl.message = "Enjoy! Only " + ctrl.count + " items.";
           }
           else { 
           ctrl.message = "Too much! (" + ctrl.count + " items)";
           }
        }
     }

     function activate() {
       ctrl.check = check;
       ctrl.clear = clear;
       clear();
     }
  }

})()
