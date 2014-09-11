mainModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',
      {
		    templateUrl: "/angular/views/home.html",
        controller: "AppCtrl" //change to actual controller
      }
    );
    $routeProvider.when('/photographerhome',
      {
        templateUrl: "/angular/views/photographerhome.html",
        controller: "AppCtrl" //change to actual controller
      }
    );

    $routeProvider.when('/clienthome',
      {
		    templateUrl: "/angular/views/clienthome.html",
        controller: "AppCtrl" //change to actual controller
      }
    );

    $routeProvider.when('/register',
      {
        templateUrl: "/angular/views/register.html",
        controller: "userController"
      }
    );
}])

//@todo move this to proper location
mainModule.controller("AppCtrl", function($scope) {
    $scope.model = {
        message: "This is my app!!!"
    }
})