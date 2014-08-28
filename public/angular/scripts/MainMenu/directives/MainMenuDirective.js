mainMenuModule.directive('mainMenuDirective', function() {
    return {
      	template: 
    		'<material-tabs selected="activeIndex" style="border: 1px solid #CCC; border-radius: 4px;">'+
            '<material-tab ng-repeat="tab in tabs" on-select="onTabSelected(tab.id)">'+
                '{{tab.title}}'+
            '</material-tab>'+
        '</material-tabs>'+

        '<div class = "profile-container" ng-show = "showProfile">'+
          '<material-card>'+
            '<img src="/images/profile.jpg" class="material-card-image">'+
            '<h2>MyProfile</h2>'+
             '<p>TodoProfile Here churva ek ek, sample lang to para may laman ang profile container</p>'+
          '</material-card>'+

        '</div>'+

        '<div class = "portfolio-container" ng-show ="showPortfolio">'+
        '<material-list>'+
          '<material-item ng-repeat="item in todos">'+
            '<div class="material-tile-left">'+
                '<img ng-src="{{item.face}}" class="face">'+
            '</div>'+
            '<div class="material-tile-content">'+
              '<h2>{{item.what}}</h2>'+
              '<h3>{{item.who}}</h3>'+
              '<p>'+
                '{{item.notes}}'+
              '</p>'+
            '</div>'+
          '</material-item>'+
        '</material-list>'+
        '</div>'
    };
  });