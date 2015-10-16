angular.module('settings').controller('SettingsConfigCtrl',['$scope', '$http', '$theme', 'Setting', '$modal', 'SweetAlert', function($scope, $http, $theme, Setting, $modal, SweetAlert){

    var table_headers;
    var table_rows = [];

    $scope.currentRole = 'admin';
    $scope.groupId = "55c2fa2e1276fa4c88d8e0b7";

    $scope.setTableData = function() {
        $scope.data = {
            headings: table_headers, rows: table_rows
        };
    };

    $scope.changePermission = function($permissionId, $roleId) {
        table_rows.forEach(function (row) {
            if (row.role._id != $roleId) return;

            var index = row.role.permission_id.indexOf($permissionId);
            if (index >= 0) {
                row.role.permission_id.splice(index, 1);
            } else {
                row.role.permission_id.push($permissionId);
            }

            var permissionValue = [];
            table_headers.forEach(function (permission) {
                if (row.role.permission_id.indexOf(permission._id) >= 0) {
                    permissionValue.push({permissionId: permission._id, value: 1});
                } else {
                    permissionValue.push({permissionId: permission._id, value: 0});
                }
            });

            row.permissionValues = permissionValue;
        });

        console.log(table_rows);
    };

    $scope.submitPermissionForm = function() {

        $scope.setSettingInfo();

        $modal.open({
            templateUrl: 'app/settings/modals/settingsSavePermissionModal/settingsSavePermissionModal.html',
            controller: 'SettinsSavePermissionModalCtrl'
        }).result.then(function(response){
            $scope.loading = false;
        });
    };

    $scope.deleteGroup = function() {
        $scope.setSettingInfo();
        $modal.open({
            templateUrl: 'app/settings/modals/settingsDeleteGroupModal/settingsDeleteGroupModal.html',
            controller: 'SettingsDeleteGroupModalCtrl'
        }).result.then(function(response){
            $scope.loading = false;
        });
    };

    $scope.setSettingInfo = function() {
        var roleIds = [];
        var permissionIds = [];

        table_rows.forEach(function(row) {
            roleIds.push(row.role._id);
            permissionIds.push(row.role.permission_id);
        });

        Setting.setSettingInfo({roleIds: roleIds, permissionIds: permissionIds, groupId: $scope.groupId});
    }

    //get Permission List
    Setting.getPermissions().then(successGetPermissions, error);


    //Callback Functions
    function successGetPermissions(response) {
        table_headers = response.data;

        //get Roles
        Setting.getRoles($scope.groupId).then(successGetRoles, error);
    }

    function successGetRoles(response) {
        $scope.roles = response.data;

        $scope.roles.forEach(function(role) {
            var permissionValue = [];
            table_headers.forEach(function(permission) {
                if (role.permission_id.indexOf(permission._id) >= 0) {
                    permissionValue.push({permissionId: permission._id, value: 1});
                }else {
                    permissionValue.push({permissionId: permission._id, value: 0});
                }
            });
            table_rows.push({role:role, permissionValues: permissionValue});
        });

        $scope.setTableData();
    }

    function successUpdateRoles(response) {
        console.log(response.data);
    }

    function error() {

    }

}]);