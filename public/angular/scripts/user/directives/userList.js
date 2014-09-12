userModule.directive('userList', function() {
    return {
      	template: 
        '<div>' +
        '<h1 ng-init="getusers();">List Users</h1>' +
        '<ul ng-repeat="user in users">' +
            '<li>{{user}}</li>' +
        '</ul>' +
        '</div>'
    };
  });
