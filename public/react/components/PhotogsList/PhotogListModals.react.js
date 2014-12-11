var divStyle = {
	height: "984px"
};
var PhotogListModals = React.createClass({
  	componentDidMount : function() {         
		$('.bestShotModal').on('show.bs.modal', function (event) {
  			  var button = $(event.relatedTarget);
			  var imgSrc = button.data('whatever') ;
			  var modal = $(this);
			  $('.modelImage').attr('src',imgSrc);
		 });
    }, 
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

