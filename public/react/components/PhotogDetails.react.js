var PhotogDetails = React.createClass({  
	render: function (){
		var storyNodes = this.props.items.map(function (item) {
		return(
				<div className="row" key = {item.userId}>
				    <div className="thumbnail col-md-6" >
				    	<div className = "profileDetails row">
					      	<img src="/images/portfolio_list/anonymousUser.jpg" alt="..."/>
					      				        <h3>{item.name}</h3>
					        <p>Type: {item.type}</p>		
					        <p>Level: {item.level}</p>	
					        <p>Shoot Count: {item.shootCount}</p>
					        <p>Portfolios:</p>
				        </div> 
				        <div className = "row">
					        <div className="col-xs-6 col-md-3">
								<a href="#" >
								  <img src="/images/portfolio_list/gallery.png" alt="..."/>
								</a>
							</div> 
							<div className="col-xs-6 col-md-3">
								<a href="#" >
								  <img src="/images/portfolio_list/gallery.png" alt="..."/>
								</a>
							</div> 
							<div className="col-xs-6 col-md-3">
								<a href="#" >
								  <img src="/images/portfolio_list/gallery.png" alt="..."/>
								</a>
							</div> 
							<div className="col-xs-6 col-md-3">
								<a href="#" >
								  <img src="/images/portfolio_list/gallery.png" alt="..."/>
								</a>
							</div> 
						</div> 
				    </div>

				    
				</div>
			);
		});

		return(
			<div className = "photogListContainer">
			<h1>Photographer's List</h1>
				{storyNodes}
			</div>	
		);
	}
	
});