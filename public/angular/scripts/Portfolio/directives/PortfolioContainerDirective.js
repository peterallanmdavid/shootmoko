portfolioModule.directive('portfolioContainer', function() {
    return {
      	template: 
        '<material-list>'+
          '<material-item ng-repeat="item in todos">'+
            '<div class="material-tile-left">'+
                '<img ng-src="{{item.face}}" class="face">'+
            '</div>'+
            '<div class="material-tile-content">'+
              '<h2>{{item.name}}</h2>'+
              '<h3>{{item.alias}}</h3>'+
              '<p>'+
                '{{item.tagline}}'+
              '</p>'+
            '</div>'+
          '</material-item>'+
        '</material-list>'
    };
  });