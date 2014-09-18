userModule.controller('userController',['$scope', '$http', 'userMessagingService', 'pubSubService', function($scope, $http, userMessagingService, pubSubService) {	
	$scope.msg = "(this msg is from userController)";
	$scope.users = [];
	$scope.msg = "";

	$scope.getusers = function(){
		$http({
	        url: '/api/listallusers',
	        method: "GET"
		}).success(function (response) {
        	console.log(response);
        	$scope.users = response;
		}).error(function (errorResponse) {
			console.log(errorResponse);
		});
	};

	$scope.login = function(){		
		//move to a service
		var postdata = {
			username: $scope.user.username,
			password: $scope.user.password,		
		};
		console.log(postdata);
		$http({
	        url: '/api/login',
	        method: "POST",
	        data: postdata
		}).success(function (response) {
        	$scope.msg = JSON.stringify(response); //save token somewhere
        	userMessagingService.userLoginSuccess();
		}).error(function (errorResponse) {			
			$scope.msg = "Error: " + JSON.stringify(errorResponse);
		});
	};

	$scope.register = function(){		
		//move to a service
		var postdata = {
			username: $scope.user.username,
			password: $scope.user.password,
			usertype: $scope.user.usertype
		};
		$http({
	        url: '/api/register',
	        method: "POST",
	        data: postdata
		}).success(function (response) {        	
        	$scope.msg = JSON.stringify(response);
		}).error(function (errorResponse) {			
			$scope.msg = "Error: " + JSON.stringify(errorResponse);
		});
	};
	//publish login Successfull
	$scope.publishLogin = function(){
		pubSubService.loginSuccess($scope.msg.token);
	};


	userMessagingService.onUserLoginSuccess($scope, $scope.publishLogin);
	
}]);
