(function(){
'use strict';

angular
	.module('charts')
	.factory('Charts', Charts);

	Charts.$inject = ['HearstAPI'];

	/**
	 * @name Charts
	 * @desc API for charts
	 * @memberOf charts
	 */
	function Charts(HearstAPI) {
		var Charts = {};

		/** 
		 * @name getCharts
		 * @desc Get charts stored in the hearst API.
		 * @return {{JSON}} charts, charts created by all authors.
		 */
		Charts.getCharts = function() {
			return HearstAPI.getCharts();
		};

		/** 
		 * @name deleteCharts
		 * @desc Delete chart entity, the related content entity is also deleted
		 * @params {{Array.Integers}} idArray, an array of chart ids to be deleted.
		 */
		Charts.deleteCharts = function(idArray) {
			return HearstAPI.deleteCharts(idArray);
		};

		return Charts;
	}
})();