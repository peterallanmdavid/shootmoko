profileModule.directive('profileContent', function() {
    return {      
    	/*  
    	restrict: 'EA',
        replace: true,
        scope: {
             onTabSelected: '&',
             getList: '&',
             newsList:'=',
             contentList: '='
        },*/
      	template: 
      		'<div>'+
	        '<material-card class="profile-content">'+
	    		'<material-tabs selected="activeIndex" style="border: 1px solid #CCC; border-radius: 4px;">'+
		            '<material-tab ng-repeat="tab in tabs" on-select="onTabSelected(tab.id)">'+
		                '{{tab.title}}'+
		            '</material-tab>'+
	        	'</material-tabs>'+

	        	'<material-card class="profile-content-list-container" ng-repeat = "news in newsList">'+
	        		'<material-toolbar>'+
                		'{{news.Title}}'+
           			'</material-toolbar>'+
	        		'<material-content>'+
	        			'<p>Description: {{news.Description}}</p>'+
	        			'<p>Location: {{news.Location}}</p>'+
	        			'<p>Price: {{news.Budget}}</p>'+
	        		'<material-content>'+
	        	'</material-card>'+
	        '</material-card>'+
	        '</div>'
    };
  });