'use strict';

userModule.factory('userMessagingService', ["$rootScope", function ($rootScope) {
    
    var user_login_success = 'user.login.success';

    var userLoginSuccess = function () {
        $rootScope.$broadcast(user_login_success);
    };


    var eventListener = function ($scope, handler, key) {
        $scope.$on(key, function (event, data) {
            handler(event, data);
        });
    };   

    var onUserLoginSuccess = function ($scope, handler) {
        eventListener($scope, handler, user_login_success);
    };


    return {
        userLoginSuccess: userLoginSuccess,
        onUserLoginSuccess: onUserLoginSuccess
    };

}]);