var ShootmokoApp = React.createClass({  
  render: function() {
    return (
      	<div>
		    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
		      <div className="container">
		        <div className="navbar-header">
		          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span className="sr-only">Toggle navigation</span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		          </button>
		          <a className="navbar-brand" href="#">Project name</a>
		        </div>
		        <div id="navbar" className="navbar-collapse collapse">
		          <ul className="nav navbar-nav">
		            <li className="active"><a href="#">Home</a></li>
		            <li><a href="#about">About</a></li>
		            <li><a href="#contact">Contact</a></li>
		            <li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="#">Action</a></li>
		                <li><a href="#">Another action</a></li>
		                <li><a href="#">Something else here</a></li>
		                <li className="divider"></li>
		                <li className="dropdown-header">Nav header</li>
		                <li><a href="#">Separated link</a></li>
		                <li><a href="#">One more separated link</a></li>
		              </ul>
		            </li>
		          </ul>
		          <ul className="nav navbar-nav navbar-right">
		            <li><a href="../navbar/">Default</a></li>
		            <li><a href="../navbar-static-top/">Static top</a></li>
		            <li className="active"><a href="./">Fixed top <span className="sr-only">(current)</span></a></li>
		          </ul>
		        </div>
		      </div>
		    </nav>

		    <div className="container">

		      
		      <div className="jumbotron">
		        <h1>Navbar example</h1>
		        <p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
		        <p>To see the difference between static and fixed top navbars, just scroll.</p>
		        <p>
		          <a className="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View navbar docs &raquo;</a>
		        </p>
		      </div>

		    </div> 
		</div>
    );
  }
});

React.render(
  <ShootmokoApp />,
  document.getElementById('smkbody')
);