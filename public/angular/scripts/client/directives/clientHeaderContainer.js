clientModule.directive('clientHeaderContainer', function() {
    return {
      	template: 
            '<div class= "client-header-container" ng-controller="clientController">'+
              '<div class="row">'+
                  '<button type="button" class="btn btn-success col-lg-3 col-md-3 col-sm-3 col-xs-3" ng-class="btn.bt1" ng-click="toggleHeader(1)">Add Post</button>'+
                  '<button type="button" class="btn btn-success col-lg-3 col-md-3 col-sm-3 col-xs-3" ng-class="btn.bt2" ng-click="toggleHeader(2)">List of Photographers</button>'+
                  '<button type="button" class="btn btn-success col-lg-3 col-md-3 col-sm-3 col-xs-3" ng-class="btn.bt3" ng-click="toggleHeader(3)">Specialty</button>'+ 
                  '<button type="button" class="btn btn-success col-lg-3 col-md-3 col-sm-3 col-xs-3" ng-class="btn.bt4" ng-click="toggleHeader(4)">OpenShoots</button>'+
              '</div>'+
            '</div>'
    };
  });