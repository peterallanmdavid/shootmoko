var PhotogsListBestShot = React.createClass({
	render: function(){
		return(
				<div className = "PhotogsListBestShot" >
					<p>Best Shots:</p>
			     	<div className = "row">
				        <div className="col-xs-6 col-md-6">
							<a href="#" data-target=".bestShotModal" role="button"  data-toggle="modal">
							  <img src="/images/portfolio_list/gallery.png" alt="..."/>
							</a>						
						</div> 
						<div className="col-xs-6 col-md-6">
							<a href="#" >
							  <img src="/images/portfolio_list/gallery.png" alt="..."/>
							</a>
						</div>
					</div>  
			     	<div className = "row">
				        <div className="col-xs-6 col-md-6">
							<a href="#" >
							  <img src="/images/portfolio_list/gallery.png" alt="..."/>
							</a>
						</div> 
						<div className="col-xs-6 col-md-6">
							<a href="#" >
							  <img src="/images/portfolio_list/gallery.png" alt="..."/>
							</a>
						</div>
					</div> 
				</div>



		);
	}
});