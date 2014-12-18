 

              
var PhotogProfile = React.createClass({
	// componentDidMount: function(){
	// 	loginUrlRedirect = "photogprofile"
	// 	if(!this.props.loginData.token){
	// 		window.location = "/react/#/login";
	// 	}
	// }, 

	getInitialState: function(){
		return {
			userDetails: { 
				userId : 001,
                name: 'Peter Allan David',
                type: 'Wedding Photography',
                level: 'Newbee',
                shootCount: 35,
                profilePicUrl: "/images/portfolio_list/pete.jpg",
                location: "Cavite",
                status: "offline",
                portfolioCount: 45,
                messageCount: 12
			}
		};
	},
	render: function(){
		return(
			<div>
				<div className = "mainContainer">
					<h4>{this.props.userDetails.userName}</h4>
					<div className = "photogProfileMain row">
						<div className = "photogMainDetails row">
							<div className = "photogProfileDetails col-md-4 col-lg-4">
								<PhotogProfileDetails uDetails = {this.state.userDetails} />
							</div>
							<div className = "col-md-4 col-lg-4">
							</div>
							<div className = "photogProfileSchedule col-md-4 col-lg-4">
								<PhotogListSchedule />
							</div>


						</div>
						<div className = "photogProfilePortfolio row">
							<PhotogProfilePortfolio />
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