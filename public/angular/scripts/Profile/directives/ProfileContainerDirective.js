profileModule.directive('profileContainer', function() {
    return {
      	template: 
     
      		'<div class = "profile-option-container col-md-4 col-sm-4 col-xs-4">'+
	        '<material-card class="profile-option">'+  	
	          
	         	'<material-toolbar class="material-theme-light">'+
			      		'My Profile'+
			     '</material-toolbar>'+
	             '<material-content class="material-content-padding">'+
		            '<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
						'<material-button ng-click="goto(\'/editprofile\')">Edit Page</material-button>'+    
					'</material-whiteframe>'+    
					'<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
						'<material-button ng-click="goto(\'/mystudio\')">My Studio</material-button>'+    
					'</material-whiteframe>'+  
					'<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
						'<material-button ng-click="goto(\'/myclients\')">My Clients</material-button>'+    
					'</material-whiteframe>'+  	
			      '</material-content>'+	
	        '</material-card>'+
	        '</div>'+

	        '<div class = "profile-content-container col-md-8 col-sm-8 col-xs-8">'+
	        '<material-card class="profile-content">'+
	        	'<img src="/images/profile.jpg" class="material-card-image-profile">'+	
 				'<h2>MyProfile</h2>'+
      			'<p>'+
      				'This will contain Profile Details'+
      			'</p>'+
	        '</material-card>'+
	        '</div>'

    };
  });