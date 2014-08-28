mainMenuModule.controller('mainMenuController',['$scope', function($scope) {
	
	var tabs = [
      { title: 'I AM A PHOTOGRAPHER', active: true,  disabled: false, content:"todo profile page of photographer" },
      { title: 'I AM LOOKING FOR A PHOTOGRAPHER', active: false, disabled: true , content:"todo list of photographers" },
    ];

    $scope.activeIndex = 0;
    $scope.tabs = [].concat(tabs);

    $scope.showProfile = false;
    $scope.showportfolio = false;

 }]);
