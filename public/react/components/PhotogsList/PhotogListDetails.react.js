var PhotogListDetails = React.createClass({
	render: function(){

		return(
			<div>
				<div className = "row">
			      	<img className = "profilePicture" src={this.props.pDetails.profilePicUrl} alt="..."/>
			      	<div className = "pDetails">
			        <h4><a href = "#">{this.props.pDetails.name}</a></h4>
				    <p>Type: {this.props.pDetails.type}</p>		
			        <p>Level: {this.props.pDetails.level}</p>	
			        <p>ShootCount: {this.props.pDetails.shootCount}</p>	
			        <p>Location: {this.props.pDetails.location}</p>	
			        <p>Status: {this.props.pDetails.status}</p>		
			        </div>					        
				</div>	
			</div>
		);
	}
});