var pSchedule = [
		{schedId : 's001', desc: "Emba and Mina's Wedding", date: '12-08-2014 2:00 PM to 3:00 PM'},
		{schedId : 's002', desc: "Payatas WildLife Photography", date: '12-09-2014 2:00 PM to 3:00 PM'},
		{schedId : 's003', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'},
		{schedId : 's004', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'}
];
var PhotogListSchedule = React.createClass({
	getInitialState: function(){
	return {
		pSchedule : [
			{schedId : 's001', desc: "Emba and Mina's Wedding", date: '12-08-2014 2:00 PM to 3:00 PM'},
			{schedId : 's002', desc: "Payatas WildLife Photography", date: '12-09-2014 2:00 PM to 3:00 PM'},
			{schedId : 's003', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'},
			{schedId : 's004', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'}
		]
		};
	},
	render: function(){
		var schedules = this.state.pSchedule.map(function (sched){
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
				<div className = "photogSchedule">			
					<div className = "pre-scrollable row">
						<h4>Schedule</h4>
							{schedules}
					</div>
				</div>
		);
	}
});
	
