userModule.controller('userController',['$scope', '$http', 'userMessagingService', 'pubSubService', 'userInfo', function($scope, $http, userMessagingService, pubSubService, userInfo) {
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
			password: $scope.user.password
		};
		console.log(postdata);
		$http({
	        url: '/api/login',
	        method: "POST",
	        data: postdata
		}).success(function (response) {
        	$scope.msg = JSON.stringify(response); //save token somewhere
        	userMessagingService.userLoginSuccess(response);
		}).error(function (errorResponse) {			
			$scope.msg = "Error: " + JSON.stringify(errorResponse);
		});
	};

    $scope.saveUserData = function(){

    };

    userMessagingService.onUserLoginSuccess($scope,function(event, data){
        userInfo.setUserInfo(data);
    });


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
	
}]);
