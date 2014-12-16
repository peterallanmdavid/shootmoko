var PhotogProfile = React.createClass({
	componentDidMount: function(){
		loginUrlRedirect = "photogprofile"
		if(!this.props.loginData.token){
			window.location = "/react/#/login";
		}
	}, 
	render: function(){
		return(
			<div>
				<div className = "mainContainer">
				<h1>Photographers Profile</h1>
			</div>	
			</div>
		);	
	}
});