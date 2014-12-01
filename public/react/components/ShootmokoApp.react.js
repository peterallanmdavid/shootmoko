var ShootmokoApp = React.createClass({  
  render: function() {
    return (
      	<div>
		   	<NavBar />
		   	<Body />
		</div>
    );
  }
});

React.render(
  <ShootmokoApp />,
  document.getElementById('smkbody')
);