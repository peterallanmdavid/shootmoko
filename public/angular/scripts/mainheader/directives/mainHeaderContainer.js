mainHeaderModule.directive('mainHeaderContainer', function() {
    return {
      	template: 
        '<div id = "header-container" class="navbar navbar-inverse navbar-fixed-top" role="navigation">'+
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
          '<div  class="collapse navbar-collapse">'+
            '<ul id = "right-navigation" class="nav navbar-nav navbar-right">'+
                '<li  class="dropdown">'+
                  '<a class="dropdown-toggle" data-toggle="dropdown">My Profile<span class="caret"></span></a>'+
                  '<ul class="dropdown-menu" role="menu">'+
                    '<li><a href="#">Edit Profile</a></li>'+
                    '<li><a href="#">Portfolio</a></li>'+
                    '<li><a href="#">Bookings</a></li>'+
                    '<li><a href="#">Schedule</a></li>'+
                    '<li><a href="#">Log out</a></li>'+
                  '</ul>'+
                '</li>'+
           '</ul>'+
          '</div>'+
        '</div>'+
      '</div>'
    };
  });