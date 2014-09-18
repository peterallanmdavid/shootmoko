mainHeaderModule.controller('mainHeaderController',['$scope', 'pubSubService', function($scope, pubSubService) {
	$scope.isLoggedIn = true;

	$scope.showHeaderProfile = function (){
		$scope.isLoggedIn = false;
	};
	pubSubService.onLoginSuccess($scope, $scope.showHeaderProfile);

}]);
