 var pbShots= [
            	{photoId : 'pId001', photoUrl: '/images/bg1.jpg'},
            	{photoId : 'pId002', photoUrl: '/images/bg2.jpg'},
              	{photoId : 'pId003', photoUrl: '/images/bg3.jpg'},
              	{photoId : 'pId004', photoUrl: '/images/bg4.jpg'},
              	{photoId : 'pId005', photoUrl: '/images/bg5.jpg'},
            	{photoId : 'pId006', photoUrl: '/images/bg2.jpg'}
] ;

var myDate = new Date();
var pgDetails = {};

var PhotogsListContainer = React.createClass({ 
	render: function (){
		var storyNodes = this.props.items.map(function (item) {
		return(
				<div className="photogListItem thumbnail row" key = {item.userId}>
					<div className = "photogListDetails col-md-3"  >				    
						<PhotogListDetails pDetails={item} />	
					</div>
					<div className = "photogsListBestShot col-md-6">
						<PhotogsListBestShot pBestShots={pbShots} />	
					</div>
				    <div className = "photogRightPanel col-md-3">
				  		<PhotogListActions pNumber = {item.portfolioCount} />
				    	<div className = "photogListSchedule">
				  			<PhotogListSchedule />
				  		</div>
					</div>	
				</div>
			);
		});

		return(
			<div className = "mainContainer">
		        <PhotogListModals />
				<h1>Photographers List</h1>
					{storyNodes}
			</div>	
		);
	}
	
});