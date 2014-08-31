mainModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/',
      {
        //templateUrl: "/angular/scripts/main-view.html",
		templateUrl: "/angular/views/home.html",
        controller: "AppCtrl"
      }
    )
    
    $routeProvider.when('/editprofile',
      {
        templateUrl: "/angular/scripts/edit-profile.html",
        controller: "AppCtrl"
      }
    )

        $routeProvider.when('/mystudio',
      {
        templateUrl: "/angular/scripts/my-studio.html",
        controller: "AppCtrl"
      }
    )

    $routeProvider.when('/myclients',
      {
        templateUrl: "/angular/scripts/my-clients.html",
        controller: "AppCtrl"
      }
    )

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

mainModule.controller("AppCtrl", function($scope) {
    $scope.model = {
        message: "This is my app!!!"
    }
})