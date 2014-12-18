var PhotogsListBestShot = React.createClass({
	render: function(){
		var  pListBestShot = this.props.pBestShots.map(function (pList){
			return(
				
				        <div className="col-xs-4 col-md-4 col-lg-4" key ={pList.photoId}>
							<a href="#" className = "pList" data-target=".bestShotModal" role="button"  data-toggle="modal" data-whatever={pList.photoUrl}>
							  <img src={pList.photoUrl} alt="..."/>
							</a>						
						</div> 
	
			)
		});
		return(	
			     	<div className = "row">
     					<h4>Best Shots:</h4>	
						{pListBestShot}
					</div>
		);
	}
});