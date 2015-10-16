(function(){
'use strict';

angular
	.module('dashboards')
	.factory('Dashboards', Dashboards);

	Dashboards.$inject = ['HearstAPI'];

	/**
	 * @name Dashboards
	 * @desc API for dashboards
	 * @memberOf dashboards
	 */
	function Dashboards(HearstAPI) {
		var Dashboards = {};

		/** 
		 * @name getDashboards
		 * @desc Get dashboards stored in the hearst API.
		 * @return {{JSON}} dashboards, dashboards created by all authors.
		 */
		Dashboards.getDashboards = function() {
			return HearstAPI.getDashboards();
		};

		/** 
		 * @name getDashboard
		 * @desc Get dashboard stored in the hearst API.
		 * @return {{JSON}} dashboard, dashboard object.
		 */
		Dashboards.getDashboard = function(contentId) {
			return HearstAPI.getDashboard(contentId);
		};

		/** 
		 * @name saveDashboard
		 * @desc Save dashboard in the hearst API.
		 * @return {{JSON}} dashboard, saved dashboard object.
		 */
		Dashboards.saveDashboard = function(title, data) {
			return HearstAPI.saveDashboard(title, data)
					.then(function(response) {
						return HearstAPI.userReference(response.data.content.id);
					});
		};

		/** 
		 * @name deleteDashboards
		 * @desc Delete dashboard entity, the related content entity is also deleted
		 * @params {{Array.Integers}} idArray, an array of dashboard ids to be deleted.
		 */
		Dashboards.deleteDashboards = function(idArray) {
			return HearstAPI.deleteDashboards(idArray);
		};

		/** 
		 * @name contentReference
		 * @desc Bulk reference content entities to another entity in the hearst API.
		 */
		HearstAPI.contentReference = function(contentId, contentIdArray) {
	    	return HearstAPI.contentReference(contentId, contentIdArray);
	    };

		return Dashboards;
	}
})();