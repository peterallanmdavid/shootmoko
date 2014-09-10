clientModule.controller('clientController',['$scope', function($scope) {
	$scope.btn = {
		bt1:"active",
		bt2:"",
		bt3:"",
		bt4:""
	}
	$scope.toggleHeader = function(button){

		$scope.btn.bt1="";
		$scope.btn.bt2="";
		$scope.btn.bt3="";
		$scope.btn.bt4="";

		if (button==1)$scope.btn.bt1="active";
		if (button==2)$scope.btn.bt2="active";
		if (button==3)$scope.btn.bt3="active";
		if (button==4)$scope.btn.bt4="active";

	}
}]);
