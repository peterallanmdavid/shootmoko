var ShootmokoApp = React.createClass({  
  render: function() {
    return (
      	<div>
		   	<NavBar />
		</div>
    );
  }
});

React.render(
  <ShootmokoApp />,
  document.getElementById('smkbody')
);