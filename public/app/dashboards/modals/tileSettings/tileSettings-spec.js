describe('TilesettingsCtrl', function() {

	beforeEach(module('dashboards'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('TilesettingsCtrl', {$scope: scope});
    }));

	it('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});