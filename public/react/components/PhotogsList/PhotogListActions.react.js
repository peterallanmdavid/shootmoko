var PhotogListActions = React.createClass({
	render: function(){

		return(
				<div>
					<div className="photogListAction list-group">
					  	<a href="#" className="list-group-item">Book</a>
					  	<a href="#" className="list-group-item">Send Message</a>
					  	<a href="#" className="list-group-item">Bookmark</a>
					  	<a href="#" className="list-group-item">Like</a>
				   		<a href="#" className="list-group-item">View Portfolio <span className="badge">{this.props.pNumber}</span></a>
					</div>
				</div>
		);
		
	}
});