var loginUrlRedirect = "";
var ShootmokoApp = React.createClass({  
	handleUserLogin: function(data){
		var postdata = {
			username: data.username.getDOMNode().value,
			password: data.password.getDOMNode().value
		};			
		$.ajax({
	        //url: this.props.url,
	        url: '/api/login',
	        dataType: 'json',
	        type: 'POST',
	        data: postdata,
	        success: function(response) {
	          this.setState({ 	loginData: { 
		          					msg: JSON.stringify(response),
		          					token: response.token,
	          					},
	          					userDetails: {
	          						userId: response.user.userId,
	          						userName: response.user.username,
	          						role: response.user.role,
	          						usertype: response.user.usertype
	          					}
	          			});
	          data.username.getDOMNode().value = '';
	          data.password.getDOMNode().value = '';	 
	          if (loginUrlRedirect!=""){
	          	window.location = "/react/#/"+loginUrlRedirect;
	          };       
	        }.bind(this),
	        error: function(xhr, status, err) {          
	          this.setState({ loginData: { msg: "Login Error"}});	          
	        }.bind(this)
		});		
		
	},

	getInitialState: function(){
		return {
			loginData: { msg: "", token: ""},
			userDetails: {userId: "", userName: "", role: "", usertype: ""} 
			};
		},
	render: function() {
		return (
			<div>
			<NavBar />
			<RouteHandler onLogin={this.handleUserLogin} loginData={this.state.loginData} userDetails = {this.state.userDetails}/>		   	
			</div>
		);
	}
});