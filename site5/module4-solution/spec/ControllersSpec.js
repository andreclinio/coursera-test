(function() {

"use-strict";

describe("Controllers receiving response from services", function() {
  beforeEach(module('MenuApp'));

  describe("Categories", function() {
     var catCtrl;
     var catMockStdResponse;
     var $controller;

     beforeEach(inject(function(_$controller_) {
       $controller = _$controller_;
       catMockStdResponse = {
         data: [
            {  id: 81, name: "Lunch", short_name: 'L', special_instructions: 'Special Lunch' },
            {  id: 82, name: "Soup",  short_name: 'S', special_instructions: 'Special Soup' },
         ],
         status: 200,
         statusText: "OK"
       };
       catCtrl = $controller('CategoriesController', { response: catMockStdResponse });
     }));

     it("controller instanciated", function() {
       expect(catCtrl).not.toBeNull();
       expect(catCtrl).not.toBeUndefined();
     });

     it("std response inside controller", function() {
       var list = catCtrl.categoriesList
       expect(list).not.toBeNull();
     });

     it("std response quantity", function() {
       var nCats = catCtrl.categoriesList.length;
       expect(nCats).toEqual(catMockStdResponse.data.length);
     });

     it("std response ids and names", function() {
       var nCats = catCtrl.categoriesList.length;
       for (var i = 0; i < nCats; i++) {
         var cat = catCtrl.categoriesList[i];
         expect(cat.id).toEqual(catMockStdResponse.data[i].id);
         expect(cat.name).toEqual(catMockStdResponse.data[i].name);
       }
     });
   });


  describe("Items", function() {
     var itmCtrl;
     var itmMockStdResponse;
     var $controller;

    beforeEach(inject(function(_$controller_){
       $controller = _$controller_;
       itmMockStdResponse = {
        data: {
           category: {  id: 81, name: "Lunch", short_name: 'L', special_instructions: 'Special Lunch' },
           menu_items: [
             {  id: 1069, name: "Orange Chicken",  short_name: 'L1', description: 'Orange Chicken' },
             {  id: 1070, name: "Gen Chicken",  short_name: 'L2', description: 'Gen Chicken' },
             {  id: 1071, name: "Super Chicken",  short_name: 'L3', description: 'Super Chicken' },
             {  id: 1072, name: "Mac Chicken",  short_name: 'L4', description: 'Mac Chicken' },
          ]
        },
        status: 200,
        statusText: "OK"
       };

       itmCtrl = $controller("ItemsController", { response: itmMockStdResponse });
    }));

    it("controller instanciated", function() {
      expect(itmCtrl).not.toBeNull();
      expect(itmCtrl).not.toBeUndefined();
    });


    it("std response inside controller", function() {
      var list = itmCtrl.itemsList;
      expect(list).not.toBeNull();
      expect(list).not.toBeUndefined();

      var cat = itmCtrl.category;
      expect(cat).not.toBeNull();
      expect(cat).not.toBeUndefined();
    });

    it("std response category match", function() {
      var cat = itmCtrl.category;
      expect(cat.name).toEqual(itmMockStdResponse.data.category.name);
    });

    it("std response quantity", function() {
      var nItms = itmCtrl.itemsList.length;
      expect(nItms).toEqual(itmMockStdResponse.data.menu_items.length);
    });

    it("std response ids and names", function() {
      var nItms = itmCtrl.itemsList.length;
      for (var i = 0; i < nItms; i++) {
        var itm = itmCtrl.itemsList[i];
        var obj = itmMockStdResponse.data.menu_items[i];
        expect(itm.id).toEqual(obj.id);
        expect(itm.name).toEqual(obj.name);
      }
    });



  });

});

})();
