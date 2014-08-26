mainMenuModule.directive('mainMenuDirective', function() {
    return {
      	template: 
      	/*
		    '<section layout="vertical" layout-sm="horizontal" layout-align="center center">'+
		    	'<material-button ng-click="toggleLeft()" class="material-button-raised material-button-colored">I AM A PHOTOGRAPHER</material-button>'+
		    	'<material-button  ng-click="toggleRight()" class="material-button-raised material-button-colored">I AM LOOKING FOR A PHOTOGRAPHER</material-button>'+
		    '</section>'
		  */
		'<material-tabs selected="activeIndex" style="background-color: #4285F4; border: 1px solid #CCC; border-radius: 4px;">'+
        '<material-tab ng-repeat="tab in tabs">'+
            '{{tab.title}}'+
        '</material-tab>'+
    	'</material-tabs>'	
    };
  });