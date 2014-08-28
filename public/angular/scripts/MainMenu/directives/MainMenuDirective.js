mainMenuModule.directive('mainMenuDirective', function() {
    return {
      	template: 
    		'<material-tabs selected="activeIndex" style="border: 1px solid #CCC; border-radius: 4px;">'+
            '<material-tab ng-repeat="tab in tabs" on-select="onTabSelected(tab.id)">'+
                '{{tab.title}}'+
            '</material-tab>'+
        '</material-tabs>'+

        '<div class = "profile-container" ng-show = "showProfile" ng-controller = "profileController">'+
          '<div profile-container></div>'+
        '</div>'+

        '<div class = "portfolio-container" ng-show ="showPortfolio" ng-controller = "portfolioController">'+
          '<div portfolio-container></div>'+
        '</div>'
    };
  });