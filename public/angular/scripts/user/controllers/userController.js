userModule.controller('userController',['$scope', '$http', function($scope, $http) {	
	$scope.msg = "(this msg is from userController)";

	$scope.register = function(){
		console.log($scope.user);
		//move to a service
		var postdata = {
			username: $scope.user.username,
			password: $scope.user.password,
			usertype: $scope.user.usertype
		};
		$http({
	        url: 'http://localhost:3000/api/register',
	        method: "POST",
	        data: postdata
		}).success(function (response) {
        	console.log(response);
		}).error(function (errorResponse) {
			console.log(errorResponse);
		});
	};
}]);
