var RouteHandler = ReactRouter.RouteHandler;
var ShootmokoApp = React.createClass({  
  render: function() {
    return (
      	<div>
		   	<NavBar />
		   	<RouteHandler/>
		   	//<Body />
		</div>
    );
  }
});

// React.render(
//   <ShootmokoApp />,
//   document.getElementById('smkbody')
// );