var divStyle = {
	width: '140px',
	height: '140px',
	backgroundColor: 'gray'
};

var photogProfileURL = "login";
var Home = React.createClass({ 
	componentDidMount: function(){
		var token = this.props.loginData.token;
		if(token){
			photogProfileURL = "photogprofile"
		}
	}, 
 	render: function(){
 		return(
			<div className="homeContainer">     
				<div className="col-lg-6">
		          <Link to="photoglist">
		           <img className="img-circle" src = "/images/portfolio_list/2.PNG" style={divStyle}/>
		           <h2>I NEED A PHOTOGRAPHER</h2>
		           </Link>
		        </div> 	 
				<div className="col-lg-6">		         
		          <Link to={photogProfileURL}>
		           <img className="img-circle" src = "/images/portfolio_list/1.PNG" style={divStyle}/>
		           <h2>I AM A PHOTOGRAPHER</h2>
		           </Link>
		        </div> 	
			</div>	 		
 		);		
 	}
 });


