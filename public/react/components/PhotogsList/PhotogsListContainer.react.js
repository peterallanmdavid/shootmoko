 var pbShots= [
            	{photoId : 'pId001', photoUrl: '/images/bg1.jpg'},
            	{photoId : 'pId002', photoUrl: '/images/bg2.jpg'},
              	{photoId : 'pId003', photoUrl: '/images/bg3.jpg'},
              	{photoId : 'pId004', photoUrl: '/images/bg4.jpg'}
] ;

var myDate = new Date();

var pSchedule = [
		{schedId : 's001', desc: "Emba and Mina's Wedding", date: '12-08-2014 2:00 PM to 3:00 PM'},
		{schedId : 's002', desc: "Payatas WildLife Photography", date: '12-09-2014 2:00 PM to 3:00 PM'},
		{schedId : 's003', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'}
];

var PhotogsListContainer = React.createClass({ 
	render: function (){
		var storyNodes = this.props.items.map(function (item) {
		return(
				<div className="thumbnail row">
					<div className = "photogListDetails col-md-6"  key = {item.userId}>
					    <div className="col-md-6" >
					    	<div className = "row">
						      	<img className = "profilePicture" src="/images/portfolio_list/anonymousUser.jpg" alt="..."/>
	      				        <h4><a href = "#">{item.name}</a></h4>
						        <p>Type: {item.type}</p>		
						        <p>Level: {item.level}</p>	
						        <p>ShootCount:{item.shootCount}</p>	
						        <p><ul className="nav nav-pills" role="tablist">
									  <li role="presentation"><a href="#">View Portfolio <span className="badge">{item.portfolioCount}</span></a></li>
									</ul>
								</p>					        
					        </div> 
					    </div>
					    <div className = "col-md-6">
					  		<PhotogsListBestShot photoList={pbShots} />	
						</div>		
					</div>
					<div className = "photogListSchedule col-md-6">
						<div className = "col-md-10">
							<PhotogListSchedule psched = {pSchedule} />
						</div>
						<div className = "col-md-2">
							<PhotogListActions />
						</div>
					</div>

				</div>
			);
		});

		return(
			<div className = "photogListContainer">

				<h1>Photographers List</h1>
					{storyNodes}
			</div>	
		);
	}
	
});