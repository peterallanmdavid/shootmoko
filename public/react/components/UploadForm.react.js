var UploadForm = React.createClass({ 
	componentDidMount: function(){
		var url= "/api/uploadphotos";
		var that = this;
		$(this.refs.fileUpload.getDOMNode()).fileupload({
	        url: url,
	        dataType: 'json',
	        headers: {"x-access-token": this.props.loginData.token},
	        done: function (e, data) {
	            $.each(data.result.files, function (index, file) {
	                $('<p/>').text(file.name).appendTo('#files');
	            });
	        },
	        progressall: function (e, data) {
	            var progress = parseInt(data.loaded / data.total * 100, 10);
	            $(that.refs.progressBar.getDOMNode()).css(
	                'width',
	                progress + '%'
	            );
	        }
    	});
	},
	render: function() {
		var containerStyle = {
			"max-width": "330px",
			"padding": "15px",
			"margin": "0 auto"
		};
		return (
			<div  style={containerStyle} >
			<span className="btn btn-success fileinput-button">
	        	<i className="glyphicon glyphicon-plus"></i>
	        	<span>Select files...</span>        	
	        	<input id="fileupload" type="file" name="files[]" multiple ref="fileUpload"/>
	    	</span>
			<br />
	    	<br />	    
		    <div id="progress" className="progress" ref="progress">
		        <div className="progress-bar progress-bar-success" ref="progressBar"></div>
		    </div>	    
		    <div id="files" className="files"></div>
		    </div>
	    );
	}
});