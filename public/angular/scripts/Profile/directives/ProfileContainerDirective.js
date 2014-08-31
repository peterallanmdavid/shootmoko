profileModule.directive('profileContainer', function() {
    return {
      	template: 
	        '<material-card>'+  	
			    '<material-sidenav class="material-sidenav-left material-whiteframe-z2" component-id="left">'+
			      '<material-toolbar class="material-theme-light">'+
			      		'<h1>My Profile</h1>'+
			      '</material-toolbar>'+
			      '<material-content class="material-content-padding">'+
		            '<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
						'<material-button ng-click="goto(\'/editprofile\')">Edit Profile</material-button>'+    
					'</material-whiteframe>'+    
					'<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
						'<material-button ng-click="goto(\'/mystudio\')">My Studio</material-button>'+    
					'</material-whiteframe>'+  
					'<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
						'<material-button ng-click="goto(\'/myclients\')">MClients</material-button>'+    
					'</material-whiteframe>'+  	
			      '</material-content>'+
			    '</material-sidenav>'+      	          
	            //'<img src="/images/profile.jpg" class="material-card-image-profile">'+		
	        '</material-card>'
    };
  });