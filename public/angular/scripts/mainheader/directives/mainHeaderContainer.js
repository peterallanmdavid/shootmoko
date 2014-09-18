mainHeaderModule.directive('mainHeaderContainer', function() {
    return {
      	template: 
        '<div id = "header-container" class="navbar navbar-inverse navbar-fixed-top" role="navigation" ng-controller = "mainHeaderController">'+
          '<div class="container-header">'+
            '<div class="navbar-header">'+
              '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
                '<span class="sr-only">Toggle navigation</span>'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
              '</button>'+
              '<a id = "text-header"class="navbar-brand" href="#">Sh(&nbsp;&nbsp;.)(&nbsp;&nbsp;.)tmoko!</a>'+
            '</div>'+
            '<div class="collapse navbar-collapse">'+
              '<ul id = "right-navigation" class="nav navbar-nav navbar-right" ng-hide = "isLoggedIn">'+
                  '<li  class="dropdown col-md-5 col-sm-5 col-lg-5">'+
                    '<a id = "profile-pic" class="dropdown-toggle" data-toggle="dropdown">'+
                    '<img ng-src="/images/portfolio_list/anonymousUser.jpg" class="profile-pic-img">'+
                    '</a>'+
                    '<ul class="dropdown-menu" role="menu">'+
                      '<li><a href="#">Edit Profile</a></li>'+
                      '<li><a href="#">Portfolio</a></li>'+
                      '<li><a href="#">Bookings</a></li>'+
                      '<li><a href="#">Schedule</a></li>'+
                      '<li><a href="#">Log out</a></li>'+
                    '</ul>'+
                  '</li>'+
                  '<li class ="profile-info col-md-7 col-sm-7 col-lg-7">'+
                  '<p>Peter Allan David</p>'+
                  '</li>'+
             '</ul>'+
            '</div>'+
            '</div>'+
          '</div>'+
        '</div>'
    };
  });