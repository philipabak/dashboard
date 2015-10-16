(function(){
    'use strict';

    angular
        .module('files')
        .factory('Group', Group);

    Group.$inject = ['$http'];

    /**
     * @name Files
     * @desc API for files
     * @memberOf files
     */
    function Group($http) {
        Group.save = function(data) {
            var dataObj = { group : data};
            return $http.post('/api/v1/groups', dataObj)
                .then(function(response) {
                    return response;
                });
        };

        Group.get = function() {
            return $http.get('/api/v1/groups')
                .then(function(response) {
                    return response;
                });
        };

        Group.del = function(groupId) {
            return $http.delete('/api/v1/groups/'+ groupId)
                .then(function(response) {
                    return response;
                });
        };

        Group.update = function(groupId,groupName) {
            var dataObj = { groupId : groupId, groupName: groupName};
            return $http.put('/api/v1/groups',dataObj)
                .then(function(response) {
                    return response;
                });
        };

        return Group;
    }
})();