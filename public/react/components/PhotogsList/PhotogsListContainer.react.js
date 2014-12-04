 var pbShots= [
            	{photoId : 'pId001', photoUrl: '/images/bg1.jpg'},
            	{photoId : 'pId002', photoUrl: '/images/bg2.jpg'},
              	{photoId : 'pId003', photoUrl: '/images/bg3.jpg'},
              	{photoId : 'pId004', photoUrl: '/images/bg4.jpg'}
] ;

var PhotogsListContainer = React.createClass({ 
	render: function (){
		var storyNodes = this.props.items.map(function (item) {
		return(
				<div className="thumbnail row">
					<div className = "col-md-6"  key = {item.userId}>
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
					  		<PhotogsListBestShot photoList={pbShots} />	
						</div>		
					</div>	
				</div>
			);
		});

		return(
			<div className = "photogListContainer">

				<h1>Photographers List</h1>
					{storyNodes}
			</div>	
		);
	}
	
});