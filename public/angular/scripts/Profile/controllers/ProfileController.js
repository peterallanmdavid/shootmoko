profileModule.controller('profileController',['$scope','$location', function($scope,$location) {
	
	$scope.goto = function(path)
	{
		$location.path(path);
	}
 }]);
