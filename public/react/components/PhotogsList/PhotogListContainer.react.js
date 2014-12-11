 var pbShots= [
            	{photoId : 'pId001', photoUrl: '/images/bg1.jpg'},
            	{photoId : 'pId002', photoUrl: '/images/bg2.jpg'},
              	{photoId : 'pId003', photoUrl: '/images/bg3.jpg'},
              	{photoId : 'pId004', photoUrl: '/images/bg4.jpg'},
              	{photoId : 'pId005', photoUrl: '/images/bg5.jpg'},
            	{photoId : 'pId006', photoUrl: '/images/bg2.jpg'},
              	{photoId : 'pId007', photoUrl: '/images/bg3.jpg'},
              	{photoId : 'pId008', photoUrl: '/images/bg4.jpg'}
] ;

var myDate = new Date();
var pgDetails = {};
var pSchedule = [
		{schedId : 's001', desc: "Emba and Mina's Wedding", date: '12-08-2014 2:00 PM to 3:00 PM'},
		{schedId : 's002', desc: "Payatas WildLife Photography", date: '12-09-2014 2:00 PM to 3:00 PM'},
		{schedId : 's003', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'},
		{schedId : 's004', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'}
];

var PhotogsListContainer = React.createClass({ 
	render: function (){
		var storyNodes = this.props.items.map(function (item) {
		return(
				<div className="photogListItem thumbnail row" key = {item.userId}>
					<div className = "photogListDetails col-md-2"  >				    
						<PhotogListDetails pDetails={item} />	
					</div>
					<div className = "photogsListBestShot col-md-7">
						<PhotogsListBestShot pBestShots={pbShots} />	
					</div>
				    <div className = "photogRightPanel col-md-3">
				  		<PhotogListActions pNumber = {item.portfolioCount} />
				    	<div className = "photogListSchedule">
				  			<PhotogListSchedule psched = {pSchedule} />
				  		</div>
					</div>	
				</div>
			);
		});

		return(
			<div className = "photogListContainer">
		        <PhotogListModals />
				<h1>Photographers List</h1>
					{storyNodes}
			</div>	
		);
	}
	
});