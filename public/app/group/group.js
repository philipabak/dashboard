(function() {
    'use strict';

    angular
        .module('dim')
        .controller('GroupCtrl', GroupCtrl);

    GroupCtrl.$ingject = ['$scope', '$state', 'auth', 'store', 'HearstAPI','$modal','User','$modalInstance','Group'];

    function GroupCtrl($scope, $state, auth, store, HearstAPI, $modal, User, Group, $modalInstance){
        $scope.close = function() {
            $modalInstance.close();
        };

        $scope.save = function() {
            Group.save($scope.newGroup)
                .then(success, error);

            function success(response) {
                if(response.data == "success") {
                    $scope.saveSuccess = true;
                    $scope.message = "New group saved successfully!";
                } else if(response.data == "repeat-group-name") {
                    alert("Group Name is repeated!");
                }
            }

            function error(response) {

            }
        };
    }
})();