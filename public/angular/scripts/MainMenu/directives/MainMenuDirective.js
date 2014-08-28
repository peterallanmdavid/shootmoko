mainMenuModule.directive('mainMenuDirective', function() {
    return {
      	template: 
    		'<material-tabs selected="activeIndex" style="border: 1px solid #CCC; border-radius: 4px;">'+
            '<material-tab ng-repeat="tab in tabs" onselected>'+
                '<span>{{tab.title}}</span>'+
            '</material-tab>'+
        '</material-tabs>'+

        '<div class = "profile-container" ng-show = "showProfile">'+
          'todo Profile Container here'+
        '</div>'+

        '<div class = "portfolio-container" ng-show = "showPortfolio">'+
          'todo list of Portfolio here'+
        '</div>'
    };
  });