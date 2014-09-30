mainHeaderModule.controller('mainHeaderController',['$scope', 'pubSubService', 'userInfo', function($scope, pubSubService, userInfo) {
	$scope.isLoggedIn = true;
    $scope.userInfo = userInfo.userInfo;
    $scope.$watch('userInfo',function(newV,oldV){
        console.log(newV);
    },true);
}]);
