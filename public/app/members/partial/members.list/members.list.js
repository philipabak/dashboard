angular.module('members').controller('MembersListCtrl',function($scope, $filter){
	$scope.myData = [{
      name: 'Moroni',
      age: 50
    }, {
      name: 'Tiancum',
      age: 43
    }, {
      name: 'Jacob',
      age: 27
    }, {
      name: 'Nephi',
      age: 29
    }, {
      name: 'Enos',
      age: 34
    }];
    $scope.gridOptions = {
      data: 'myData',
      enableCellSelection: true,
      enableRowSelection: false,
      enableCellEditOnFocus: true,
      columnDefs: [{
        field: 'name',
        displayName: 'Name',
        enableCellEdit: true
      }, {
        field: 'age',
        displayName: 'Age',
        enableCellEdit: true
      }]
    };

    $scope.users = [{
      id: 1,
      name: 'Tara Jackson',
      email: 'tarajackson59@gmamil.com',
      role: 1
    }, {
      id: 2,
      name: 'John Smith',
      email: 'johnsmith@yahoo.com',
      role: 2
    }, {
      id: 3,
      name: 'Randy Williams',
      email: 'randywilliams@gmail.com',
      role: 2
    }];

    $scope.statuses = [{
      value: 1,
      text: 'status1'
    }, {
      value: 2,
      text: 'status2'
    }, {
      value: 3,
      text: 'status3'
    }, {
      value: 4,
      text: 'status4'
    }];

    $scope.roles = [{
      id: 1,
      text: 'admin'
    }, {
      id: 2,
      text: 'user'
    }];

    $scope.showRole = function(user) {
      if (user.role && $scope.roles.length) {
        var selected = $filter('filter')($scope.roles, {
          id: user.role
        });
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.role || 2;
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if (user.status) {
        selected = $filter('filter')($scope.statuses, {
          value: user.status
        });
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {
        id: id
      });
      // return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length + 1,
        name: '',
        email: '',
        role: 2
      };
      $scope.users.push($scope.inserted);
    };
});