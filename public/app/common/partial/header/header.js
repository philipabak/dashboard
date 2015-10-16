(function() {
'use strict';

angular
	.module('dim')
	.controller('HeaderCtrl', HeaderCtrl);

	HeaderCtrl.$ingject = ['$scope', '$state', 'auth', 'store', 'HearstAPI','$modal','User'];

	function HeaderCtrl($scope, $state, auth, store, HearstAPI, $modal, User){
		$scope.auth = auth;

		$scope.login = function () {
			auth.signin({
				connections: ['amazon'],
			}, function (profile, token) {
				// Success callback
				store.set('profile', profile);
				store.set('token', token);
				getUserSession();
			}, function () {
				// Error callback
			});
		};

		$scope.logout = function() {
			auth.signout();
			store.remove('profile');
			store.remove('token');
			$state.go('home');
		};

        $scope.createGroup = function() {
            $modal.open({
                templateUrl: 'app/group/modals/createGroup.html',
                controller: 'GroupCtrl'
            }).result.then(function(){

            });
        }

		function getUserSession() {
			HearstAPI
				.sessionUser()
				.then(success, error);

			function success(profile) {
				// remove chart from charts array.
				store.set('user.profile', profile);
				User.profile = profile;
		   		$state.go('dashboards.list');
			}

			function error(response) {
				// error for session user
			}
		}

	}
})();