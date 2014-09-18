pubSubModule.factory('pubSubService', ["$rootScope", function ($rootScope) {
	var login_success = "login.success";

    var loginSuccess = function (data) {
        console.log('publishing...');
        console.log(data);
        $rootScope.$broadcast(login_success, data);
    };

     var onLoginSuccess = function ($scope, handler) {
        $scope.$on(login_success, function (event, args) {
            handler(args);
        });
    };

    return {
        loginSuccess: loginSuccess,
        onLoginSuccess: onLoginSuccess
    };


}]);