var divStyle = {
	height: "984px"
};
var PhotogListModals = React.createClass({
	render: function(){
		return(
			<div className="modal fade bestShotModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
				<div className="modal-backdrop fade in" style={divStyle}></div>
				<div className = "modalContent">
			    	<div className = "model-header">
			    		<button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">
			    		×</span>
			    		<span className="sr-only">Close</span>
			    		</button>
				    	<h4 class="modal-title" id="myModalLabel">Picture 1</h4>
			    	</div>

			    	<div className="modal-body">
			    		<div className = "modalBody">
				    	<img  className = "modelImage" src="/images/bg1.jpg" alt="..."/>
				    	 </div>
				    </div>
			    </div>
			</div>
		);
	}
});

