(function(){
    'use strict';

    angular
        .module('settings')
        .factory('Setting', Setting);

    Setting.$inject = ['$http'];

    /**
     * @name Files
     * @desc API for files
     * @memberOf files
     */
    function Setting($http) {
        var settingInfo = {};
        Setting.getPermissions = function() {
            return $http.get('/api/v1/permissions')
                .then(function(response) {
                    return response;
                });
        };

        Setting.getRoles = function(groupId) {
            return $http.get('/api/v1/roles/'+ groupId)
                .then(function(response) {
                    return response;
                });
        };

        Setting.updateRoles = function(roleIds, permissionIds) {
            var dataObj = { roleIds : roleIds, permissionIds: permissionIds};
            return $http.put('/api/v1/roles',dataObj)
                .then(function(response) {
                    return response;
                });
        };


        Setting.deleteGroup = function(groupId) {
            return $http.delete('/api/v1/groups/'+ groupId)
                .then(function(response) {
                    return response;
                });
        };


        Setting.setSettingInfo = function ( arrRole ) {
            settingInfo = {
                roleIds: arrRole.roleIds,
                permissionIds: arrRole.permissionIds,
                groupId: arrRole.groupId
            };
        };

        Setting.getSettingInfo = function() {
            return settingInfo;
        };

        return Setting;
    }
})();