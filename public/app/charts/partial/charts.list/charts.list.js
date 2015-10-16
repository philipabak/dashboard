(function(){
'use strict';

angular
	.module('charts')
	.controller('ChartsListCtrl', ChartsListCtrl);

	ChartsListCtrl.$inject = ['$scope', 'SweetAlert', '$modal', 'Charts'];

	/**
	 * @name ChartsListCtrl
	 * @desc List charts in list and grid views.
	 * @memberOf charts
	 */
	function ChartsListCtrl($scope, SweetAlert, $modal, Charts) {
		$scope.loading = true;
		$scope.view = 'list';
		$scope.displayView = displayView;
		$scope.charts = [];
		$scope.predicate = 'data.chartSettings.title';
		$scope.reverse = true;
		$scope.order = order;
		$scope.selectedCharts = [];
		$scope.selected = selected;
		$scope.selectChart = selectChart;
		$scope.selectAllCharts = selectAllCharts;
		$scope.deleteAllCharts = deleteAllCharts;
		$scope.deleteChart = deleteChart;
		$scope.shareChart = shareChart;

		init();

		function init() {
			loadCharts();
		}

		/** 
		 * @name displayView
		 * @desc Open loadingCharts modal and load charts.
		 */
		function displayView(type) {
			return !$scope.loading && ($scope.view === type);
		}

		/** 
		 * @name loadCharts
		 * @desc Open loadingCharts modal and load charts.
		 */
		function loadCharts() {
			$modal.open({
			  templateUrl: 'app/charts/modals/loadCharts/loadCharts.html',
			  controller: 'LoadchartsCtrl'
			}).result.then(function(charts){
			  $scope.charts = charts;
			  $scope.loading = false;
			});	
		}

		/** 
		 * @name order
		 * @desc Change descending and ascending order of predicate.
		 */
		function order(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		}

		/** 
		 * @name selectAllCharts
		 * @desc Add or Remove all charts from $scope.selectedCharts.
		 * @params {{Boolean}} selectAll, are we adding or removing charts.
		 */
		function selectAllCharts(selectAll) {
			if(selectAll) {
				$scope.selectedCharts = angular.copy($scope.charts);
			} else {
				$scope.selectedCharts = [];
			}
		}

		/** 
		 * @name selectChart
		 * @desc Check if chart is in $scope.selectedCharts.
		 * @params {{Object}} chart, a chart object.
		 */
		function selectChart(chart) {
			if(selected(chart)) {
				$scope.selectedCharts = _.reject($scope.selectedCharts, function(item) {
					return item.id === chart.id;
				});
			} else {
				$scope.selectedCharts.push(chart);
			}
		}

		/** 
		 * @name selected
		 * @desc Check if chart is selected, in $scope.selectedCharts.
		 * @params {{Object}} chart, a chart object.
		 * @return {{Boolean}} returns undefined if chart is not found.
		 */
		function selected(chart) {
			return _.findWhere($scope.selectedCharts, {
				id: chart.id
			});
		}

		/** 
		 * @name Delete All Charts
		 * @desc Display a sweetalert to confirm charts deletion.
		 * On cancel deletion, display a message that the charts
		 * are safe and have not been deleted.
		 * On delete, display a message that the charts have been deleted.
		 */
		function deleteAllCharts() {
			var numberOfSelectedCharts = $scope.selectedCharts.length;

			if(numberOfSelectedCharts > 0) {
				SweetAlert.swal({
				   title: 'Are you sure?',
				   text: 'You will not be able to recover these ' + numberOfSelectedCharts + ' charts!',
				   type: "warning",
				   showCancelButton: true,
				   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete them!",
				   cancelButtonText: "No, cancel please!",
				   closeOnConfirm: false,
				   closeOnCancel: false }, 
				function(isConfirm){ 
				   if (isConfirm) {
				   		Charts
			   				.deleteCharts(getIdArray($scope.selectedCharts))
			   				.then(success, error);
				   } else {
				      SweetAlert.swal("Cancelled", "Your charts are safe :)", "error");
				   }
				});
			}

			function getIdArray(charts) {
				var idArray = [];
				angular.forEach(charts, function(chart) { 
					idArray.push(parseInt(chart.id, 10));
		   		});

				return idArray;
			}

			function success(response) {
				// remove charts from charts array.
		   		angular.forEach($scope.selectedCharts, function(chart) { 
		   			$scope.charts = _.reject($scope.charts, function(item) {
						return item.id === chart.id;
					});
		   		});
		   		// empty selected charts array.
		   		$scope.selectedCharts = [];
				SweetAlert.swal("Deleted!", "Your charts have been deleted.", "success");
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}

		/** 
		 * @name Delete Chart
		 * @desc Display a sweetalert to confirm chart deletion.
		 * On cancel deletion, display a message that the chart
		 * is safe and has not been deleted.
		 * On delete, display a message that the chart has been deleted.
		 * @params {{Object}} chart, a chart object.
		 */
		function deleteChart(chart) {
			SweetAlert.swal({
			   title: "Are you sure?",
			   text: "You will not be able to recover this chart!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
			   cancelButtonText: "No, cancel please!",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			   		Charts
		   				.deleteCharts(chart.id)
		   				.then(success, error);
			   } else {
			      SweetAlert.swal("Cancelled", "Your chart is safe :)", "error");
			   }
			});

			function success(response) {
				// remove chart from charts array.
		   		$scope.charts = _.reject($scope.charts, function(item) {
					return item.id === chart.id;
				});
				$scope.selectedCharts = _.reject($scope.selectedCharts, function(item) {
					return item.id === chart.id;
				});
				SweetAlert.swal("Deleted!", "Your chart has been deleted.", "success");	
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}

		/** 
		 * @name Share Chart
		 * @desc Display a modal for user to copy the share url
		 * or iframe for the chart selected.
		 * @params {{Number}} chartId, the chart id. 
		 */
		function shareChart(chartId) {
			$modal.open({
			  templateUrl: 'app/charts/modals/shareChart/shareChart.html',
			  controller: 'SharechartCtrl',
			  resolve: {
		        chartId: function () {
		          return chartId;
		        }
		      }
			})
		}
	}
})();