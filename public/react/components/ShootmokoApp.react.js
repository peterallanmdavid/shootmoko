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
	          this.setState({ loginData: { 
	          					msg: JSON.stringify(response),
	          					token: response.token
	          				}});
	          data.username.getDOMNode().value = '';
	          data.password.getDOMNode().value = '';	          
	        }.bind(this),
	        error: function(xhr, status, err) {          
	          this.setState({ loginData: { msg: "Login Error"}});	          
	        }.bind(this)
		});		
		
	},

	getInitialState: function(){
		return { loginData: { msg: "", token: ""}};
	},
	render: function() {
		return (
			<div>
			<NavBar />
			<RouteHandler onLogin={this.handleUserLogin} loginData={this.state.loginData}/>		   	
			</div>
		);
	}
});