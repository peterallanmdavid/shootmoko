var divStyle = {
	width: '140px',
	height: '140px',
	backgroundColor: 'gray'
};

var Home = React.createClass({  
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
		          <Link to="tmpholder">
		           <img className="img-circle" src = "/images/portfolio_list/1.PNG" style={divStyle}/>
		           <h2>I AM A PHOTOGRAPHER</h2>
		           </Link>
		        </div> 	
			</div>	 		
 		);		
 	}
 });


