
(function() {

"use-strict";

describe("Components", function() {

   var $componentController;

   beforeEach(module('MenuApp'));
   beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_;
   }));

   // One Item
   // ------------------------------------------------------------------------
   describe("one-item", function() {

     it('check item name', function() {
      // Pass bindings that are needed for the test
      var theName = 'THE NAME'
      var bindings = {theItem: {name: theName}};
      var ctrl = $componentController('oneItem', {$element: null}, bindings);

      var itemName = ctrl.getItemName();
      expect(itemName).toEqual(theName);
    });

  });

  // Items
  // ------------------------------------------------------------------------
  describe("items", function() {
    var zeroName = "ZERO";
    var stdList = [ {name: zeroName}, {name: "OTHER"} ];
    var bindings = {
      itemsList: stdList,
    };

    it('length', function() {
      var ctrl = $componentController('items', {}, bindings);
      expect(ctrl.itemsList).toEqual(stdList);
    });

    it('first name ok', function() {
      var ctrl = $componentController('items', {}, bindings);
      expect(ctrl.itemsList[0].name).toEqual(zeroName);
    });

  });

  // Categories
  // ------------------------------------------------------------------------
  describe("categories", function() {
    var zeroName = "ZERO";
    var oneName = "ONE";
    var stdList = [ {name: zeroName}, {name: oneName} ];
    var bindings = {
        categoriesList: stdList,
    };

    it('length', function() {
      var ctrl = $componentController('categories', {}, bindings);
      expect(ctrl.categoriesList).toEqual(stdList);
    });

    it('first and second names ok', function() {
      var ctrl = $componentController('categories', {}, bindings);
      expect(ctrl.categoriesList[0].name).toEqual(zeroName);
      expect(ctrl.categoriesList[1].name).toEqual(oneName);
    });
  });

// End of all describes
});


// IIFE
})()
