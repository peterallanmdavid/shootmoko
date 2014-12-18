var PhotogListSchedule = React.createClass({
	getInitialState: function(){
	return {
		pSchedule : [
			{schedId : 's001', desc: "Emba and Mina's Wedding", date: '12-08-2014 2:00 PM to 3:00 PM'},
			{schedId : 's002', desc: "Payatas WildLife Photography", date: '12-09-2014 2:00 PM to 3:00 PM'},
			{schedId : 's003', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'},
			{schedId : 's004', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'},
			{schedId : 's005', desc: "Bold Photographer WildLife Photography", date: '12-10-2014 2:00 PM to 3:00 PM'}
		]
		};
	},

	cancelBooking: function (){
		console.log("Peter Pogi------------------------------------------------------>");
	},
	render: function(){
		var schedules = this.state.pSchedule.map(function (sched){
			return(
				<div className = "itemSchedule" key = {sched.schedId} >
					<h5>{sched.desc}</h5>
					<p>{sched.date}</p>
					<div className="btn-group" role="group" aria-label="...">
					  <button type="button" className="btn btn-default" onClick={this.cancelBooking}>Cancel</button>
					  <button type="button" className="btn btn-default">Reschedule</button>
					</div>
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
	
