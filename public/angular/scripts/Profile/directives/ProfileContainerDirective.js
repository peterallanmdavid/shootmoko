profileModule.directive('profileContainer', function() {
    return {
      /*
        restrict: 'EA',
        replace: true,
        scope: {
        },*/
      	template: 
          '<div>'+
        		'<div class = "profile-option-container col-md-3 col-sm-3 col-xs-3">'+
        			'<div profile-option></div>'+
  	        '</div>'+
            //contentList ="contentList" newsList="newsList"  get-list = "getList(tab)"
  	        '<div class = "profile-content-container col-md-9 col-sm-9 col-xs-9" >'+
  				    '<div profile-content></div>'+
  	        '</div>'+
          '</div>'

    };
  });