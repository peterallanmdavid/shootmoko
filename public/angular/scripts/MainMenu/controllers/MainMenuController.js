mainMenuModule.controller('mainMenuController',['$scope', function($scope) {
	
	var tabs = [
      {id:1, title: 'I AM A PHOTOGRAPHER', active: true,  disabled: false, content:"todo profile page of photographer" },
      {id:2, title: 'I AM LOOKING FOR A PHOTOGRAPHER', active: false, disabled: true , content:"todo list of photographers" },
    ];

    $scope.activeIndex = 0;
    $scope.tabs = [].concat(tabs);
    $scope.showProfile = false;
    $scope.showPortfolio = false;


    $scope.onTabSelected = function(tab){
    	if (tab==1){
    		$scope.showProfile = true;
    		$scope.showPortfolio = false;
    	}else
    	{
    		$scope.showProfile = false;
    		$scope.showPortfolio = true;
    	}
    	
    }
 }]);
