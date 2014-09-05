photographerModule.directive('photogPostsContainer', function() {
    return {
      	template: 
      	'<div class = "photog-posts-container" ng-repeat = "posts in postList">'+
      		'<a href="#">{{posts.title}}</a>'+
      		'<p>{{posts.location}}</p>'+
      		'<p>{{posts.timePosted}}</p>'+
      	'</div>'
    };
  });