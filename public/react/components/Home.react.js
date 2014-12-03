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
		          <Link to="PhotogList">
		           <img className="img-circle" src = "/images/portfolio_list/2.PNG" style={divStyle}/>
		           <h2>I NEED A PHOTOGRAPHER</h2>
		           </Link>
		        </div> 	 
				<div className="col-lg-6">		         
		          <Link to="TmpHolder">
		           <img className="img-circle" src = "/images/portfolio_list/1.PNG" style={divStyle}/>
		           <h2>I AM A PHOTOGRAPHER</h2>
		           </Link>
		        </div> 	
			</div>	 		
 		);		
 	}
 });


