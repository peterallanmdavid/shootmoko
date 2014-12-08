var PhotogsListBestShot = React.createClass({
	render: function(){
		var  pListBestShot = this.props.photoList.map(function (pList){
			return(
				
				        <div className="col-xs-6 col-md-6 col-lg-6" key ={pList.photoId}>
							<a href="#" className = "pList" data-target=".bestShotModal" role="button"  data-toggle="modal" data-whatever={pList.photoUrl}>
							  <img src={pList.photoUrl} alt="..."/>
							</a>						
						</div> 
	
			)
		});
		return(
				<div>
				<h3>Best Shots:</h3>
					<div className = "PhotogsListBestShot"  >					
				     	<div className = "row">
							{pListBestShot}
						</div>  			    
					</div>
				</div>
		);
	}
});