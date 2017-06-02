(function(){

  'use-strict';

  describe("MenuDataService", function(){
     var MenuDataService;
     var $httpBackend;
     var BaseURL;

     beforeEach(function() {
        module("Data");
        inject(function($injector){
           MenuDataService = $injector.get('MenuDataService');
           $httpBackend = $injector.get('$httpBackend');
           BaseURL = $injector.get('BaseURL');
        });
     });

     it('return data', function() {
        var obj = ["Lunch", "Specials"];
        $httpBackend.whenGET(BaseURL + '/categories.json').respond(obj);
        MenuDataService.getAllCategories().then(
           function(response) {
             var data = response.data;
             expect(response.status).toEqual(200, 'status must be OK');
             expect(data).toEqual(obj, 'objects should be equal!');
           },
           function(response) {
             expect(false).toBeTrue('bad request' + response.status);
          }
       );
       $httpBackend.flush();
     });
  });


})();
