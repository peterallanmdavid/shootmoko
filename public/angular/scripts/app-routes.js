mainModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',
      {
		templateUrl: "/angular/views/home.html",
        controller: "AppCtrl"
      }
    );
    
    $routeProvider.when('/photographerhome',
      {
		templateUrl: "/angular/views/photographer.html",
        controller: "AppCtrl"
      }
    );

    $routeProvider.when('/clienthome',
      {
		templateUrl: "/angular/views/lookingforphotographer.html",
        controller: "AppCtrl"
      }
    );

}])

//@todo move this to proper location
mainModule.controller("AppCtrl", function($scope) {
    $scope.model = {
        message: "This is my app!!!"
    }
})