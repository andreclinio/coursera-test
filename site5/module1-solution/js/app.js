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
     }

     function check() {
        var text = ctrl.list;
        if (!text) {
           ctrl.message = "Nothing? On a diet?!"
           return;
        }

        var list = text.split(",");
        var remark = "";
        
        var discount = 0;
        for (var i = 0; i < list.length; i++) {
           var tmp = list[i];
           tmp = tmp.replace(/ /g, "");
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

        var n = list.length - discount;
        ctrl.remark = remark;
        if (n <= 3) {
           ctrl.message = "Enjoy! Only " + n + " items.";
        }
        else { 
           ctrl.message = "Too much! (" + n + " items)";
        }
     }

     function activate() {
       ctrl.check = check;
       ctrl.clear = clear;
       clear();
     }
  }

})()
