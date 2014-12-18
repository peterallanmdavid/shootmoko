var PhotogProfileDetails = React.createClass({
	render: function(){
		return(
				<div>
					<div className = "photogProfilePicture col-md-6 col-lg-6">
						<img src="/images/portfolio_list/pete.jpg" alt="..."/>
					</div>
					<div className = "col-md-6 col-lg-6">
				        <h4>{this.props.uDetails.name}</h4>
					    <p>Type: {this.props.uDetails.type}</p>		
				        <p>Level: {this.props.uDetails.level}</p>	
				        <p>ShootCount: {this.props.uDetails.shootCount}</p>	
				        <p>Location: {this.props.uDetails.location}</p>	
				        <p>Status: {this.props.uDetails.status}</p>	
					</div>
				</div>
		);
	}
});
