var RouteHandler = ReactRouter.RouteHandler;
var ShootmokoApp = React.createClass({  
  render: function() {
    return (
            <div>
              <NavBar />
              <PhotogListModals />
        	   	<RouteHandler/>		   	
    	      </div>
    );
  }
});