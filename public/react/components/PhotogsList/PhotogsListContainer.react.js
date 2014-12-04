var PhotogsListContainer = React.createClass({  
	render: function (){
		var storyNodes = this.props.items.map(function (item) {
		return(
				<div className="thumbnail row" key = {item.userId}>
					<div className = "col-md-6">
					    <div className="col-md-6" >
					    	<div className = "profileDetails row">
						      	<img className = "profilePicture" src="/images/portfolio_list/anonymousUser.jpg" alt="..."/>
	      				        <h3>{item.name}</h3>
						        <p>Type: {item.type}</p>		
						        <p>Level: {item.level}</p>	
						        <p>Shoot Count: {item.shootCount}</p>
						        
					        </div> 
					    </div>
					    <div className = "col-md-6">
					  		<PhotogsListBestShot />	
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