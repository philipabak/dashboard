(function() {
'use strict';

angular
	.module('dashboards')
	.controller('DashboardsCreateCtrl', DashboardsCreateCtrl);

	DashboardsCreateCtrl.$inject = ['$scope', '$stateParams', '$modal', '$timeout', 'Dashboards', 'SweetAlert'];

	function DashboardsCreateCtrl($scope, $stateParams, $modal, $timeout, Dashboards, SweetAlert){
		$scope.dashboard = {};
		$scope.dashboardTiles = [];
		$scope.openTileSettings = openTileSettings;
		$scope.addChart = addChart;
		$scope.addText = addText;
		$scope.editText = editText;
		$scope.deleteTile = deleteTile;
		$scope.saveDashboard = saveDashboard;

		if ($stateParams.id){
			getDashboard($stateParams.id);
		}

		$scope.gridsterOpts = {
		    columns: 24, // the width of the grid, in columns
		    pushing: true, // whether to push other items out of the way on move or resize
		    floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
		    swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
		    width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
		    colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
		    rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
		    margins: [10, 10], // the pixel distance between each widget
		    outerMargin: true, // whether margins apply to outer edges of the grid
		    isMobile: false, // stacks the grid items if true
		    mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
		    mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
		    minColumns: 1, // the minimum columns the grid must have
		    minRows: 2, // the minimum height of the grid, in rows
		    maxRows: 100,
		    defaultSizeX: 2, // the default width of a gridster item, if not specifed
		    defaultSizeY: 1, // the default height of a gridster item, if not specified
		    minSizeX: 1, // minimum column width of an item
		    maxSizeX: null, // maximum column width of an item
		    minSizeY: 1, // minumum row height of an item
		    maxSizeY: null, // maximum row height of an item
		    resizable: {
		       enabled: true,
		       handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		       start: function(event, $element, widget) {
		       		$scope.$broadcast('highchartsng.reflow');
		       }, // optional callback fired when resize is started,
		       resize: function(event, $element, widget) {
		       		$scope.$broadcast('highchartsng.reflow');
		       }, // optional callback fired when item is resized,
		       stop: function(event, $element, widget) {
		    		$timeout(function() {
		    			$scope.$broadcast('highchartsng.reflow')
		    		}, 300);
		       } // optional callback fired when item is finished resizing
		    },
		    draggable: {
		       enabled: true, // whether dragging items is supported
		       handle: '.my-class', // optional selector for resize handle
		       start: function(event, $element, widget) {}, // optional callback fired when drag is started,
		       drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
		       stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
		    }
		};

		$scope.$watch(function() {
			var gridster = angular.element('.gridster');
			return gridster.width();
		}, function(tiles){
			$timeout(function() {
    			$scope.$broadcast('highchartsng.reflow')
    		}, 300);
		}, true);

		function openTileSettings(tile) {
			$modal.open({
				templateUrl: 'app/dashboards/modals/tileSettings/tileSettings.html',
				controller: 'TilesettingsCtrl',
				resolve: {
					tile: function () {
						return tile;
					}
				}
			}).result.then(function(updatedTile){
			  tile = updatedTile;
			});
		}

		function deleteTile(tile) {
			$scope.dashboardTiles.splice($scope.dashboardTiles.indexOf(tile), 1);
		}

		function addChart() {
			$scope.dashboardTiles.push({ sizeX: 8, sizeY: 7, chartConfig: {
				  		options: {
					        xAxis: {
					            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
					        },
					        yAxis: {
					            title: {
					                text: 'Temperature (°C)'
					            },
					            plotLines: [{
					                value: 0,
					                width: 1,
					                color: '#808080'
					            }]
					        },
					        exporting: false,
					        tooltip: {
					            valueSuffix: '°C'
					        }
					    },
					    series: [{
				            name: 'Tokyo',
				            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
				        }, {
				            name: 'New York',
				            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
				        }, {
				            name: 'Berlin',
				            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
				        }, {
				            name: 'London',
				            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
				        }]
			}, style: { 'color': '', 'background-color': '', 'background-image': ''}});
		}

		function addText() {
			$modal.open({
			  templateUrl: 'app/dashboards/modals/textEditor/textEditor.html',
			  controller: 'TexteditorCtrl',
			  resolve: {
		        tile: function () {
		          return {};
		        }
		      }
			}).result.then(function(text){
			  $scope.dashboardTiles.push({ sizeX: 8, sizeY: 2, text: text, style: { 'color': '', 'background-color': '', 'background-image': ''} });
			});
		}

		function editText(tile) {
			$modal.open({
			  templateUrl: 'app/dashboards/modals/textEditor/textEditor.html',
			  controller: 'TexteditorCtrl',
			  resolve: {
		        tile: function () {
		          return tile;
		        }
		      }
			}).result.then(function(text){
				tile.text = text;
			});
		}

		function getDashboard(contentId) {
	   		Dashboards
   				.getDashboard(contentId)
   				.then(success, error);

			function success(dashboard) {
				$scope.dashboard = dashboard;
				$scope.dashboardTiles = $scope.dashboard.data;
			}

			function error(response) {
				// getDashboard error
			}
		}

		function saveDashboard() {
	   		Dashboards
   				.saveDashboard('Dashboard Title', $scope.dashboardTiles)
   				.then(success, error);

			function success(response) {
				SweetAlert.swal("Saved!", "Your dashboard has been saved.", "success");	
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}
	}

})();