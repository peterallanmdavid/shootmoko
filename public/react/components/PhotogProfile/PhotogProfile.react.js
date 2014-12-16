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
					<h4>{this.props.userDetails.userName}</h4>
					<div className = "photogProfileMain row">
						<div className = "photogProfileDetails col-md-6 col-lg-6">
							<img className = "profilePicture" src="/images/portfolio_list/pete.jpg" alt="..."/>
						</div>
						<div className = "photogProfilePortfolio col-md-6 col-lg-6">
							photogporfilios here
						</div>
					</div>
					<div className = "photogProfileComments row">
						Comments Here
					</div>
				</div>	
			</div>
		);	
	}
});