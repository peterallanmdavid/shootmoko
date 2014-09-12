clientModule.directive('clientHeaderContainer', function() {
    return {
      	template: 
            '<div class= "client-header-container" ng-controller="clientController">'+
              '<div class="cards-header"> ' +
                '<div class="label">Photographers</div>' + 
                '<div class="clear-block"></div>' + 
              '</div>' +
              '<div class="cards" ng-repeat="photographer in photographers">'+
                  '<div class="cards-list">'+
                    '<div class="cards-main"><img src="{{photographer.face}}"></div>'+
                    '<div class="cards-label">'+
                      '<div>{{photographer.name}}</div>' +
                      '<div>{{photographer.rating}}</div>' +
                    '</div>'+
                  '</div>'+
                '</div>' +
            '</div>'
    };
  });