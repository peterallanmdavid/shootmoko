photographerModule.directive('photogPostsContainer', function() {
    return {
      	template: 

      	'<div class = "photog-posts-container" ng-repeat = "posts in postList">'+
      		'<div class = "col-md-1 col-lg-1 col-sm-1">'+
      			'<img ng-src="{{posts.face}}" class="face">'+
      		'</div>'+
      		'<div class = "post-detail col-md-11 col-lg-11 col-sm-11">'+
      		'<a href="#">{{posts.title}}</a>'+
      		'<p><Location: {{posts.location}}</p>'+
      		'<p>Date Posted: {{posts.timePosted}}</p>'+
          '<p>Budget: {{posts.budget}}</p>'+
      		'</div>'+
      	'</div>'
    };
  });