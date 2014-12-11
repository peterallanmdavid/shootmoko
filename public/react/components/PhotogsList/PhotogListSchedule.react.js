var PhotogListSchedule = React.createClass({
	render: function(){
		var schedules = this.props.psched.map(function (sched){
			return(
				<div key = {sched.schedId} >
						<ul>
							<li>
								<p>Event: {sched.desc}</p>
								<p>Schedule: {sched.date}</p>
							</li>
						</ul>
				</div>
			);
		});

		return(				
				<div className = "pre-scrollable row">
					<h4>Photographers Schedule</h4>
						{schedules}
				</div>
		);
	}
});
	
