profileModule.directive('profileOption', function() {
    return {
      	template: 
          '<material-card class="profile-option">'+   
            
            '<material-toolbar class="material-theme-light">'+
                'My Profile'+
           '</material-toolbar>'+
               '<material-content class="material-content-padding">'+
                '<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
            '<material-button ng-click="goto(\'/editprofile\')">My Page</material-button>'+    
          '</material-whiteframe>'+    
          '<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
            '<material-button ng-click="goto(\'/mystudio\')">My Studio</material-button>'+    
          '</material-whiteframe>'+  
          '<material-whiteframe class="material-whiteframe-z1" layout layout-align="center center">'+    
            '<material-button ng-click="goto(\'/myclients\')">My Clients</material-button>'+    
          '</material-whiteframe>'+   
            '</material-content>'+  
          '</material-card>'
    };
  });