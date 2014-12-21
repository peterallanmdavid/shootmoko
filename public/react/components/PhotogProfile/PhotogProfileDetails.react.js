var PhotogProfileDetails = React.createClass({
	render: function(){
		return(
				<div>
					<div className = "col-md-6 col-lg-6" >
						<img className = "photogProfilePicture" src="/images/portfolio_list/pete.jpg" alt="..."/>
						<div className="photogProfileAction list-group">
						  	<a href="#" className="list-group-item">Edit Profile</a>
						  	<a href="#" className="list-group-item">Messages  <span className="badge"> {this.props.uDetails.messageCount}</span></a>
						  	<a href="#" className="list-group-item">Groups</a>
						  	<a href="#" className="list-group-item">Booking Requests</a>
						</div>
					</div>
					<div className = "col-md-6 col-lg-6" >

			        <h4>{this.props.uDetails.name}</h4>
			        <p>Level: {this.props.uDetails.level}</p>	
			        <p>ShootCount: {this.props.uDetails.shootCount}</p>	
			        <p>Location: {this.props.uDetails.location}</p>	
			        <h4>About Me:</h4>
			        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>	
			        </div>
				</div>
		);
	}
});
