var PhotogDetails = React.createClass({  
	render: function (){
		var storyNodes = this.props.items.map(function (item) {
		return(
			<tr key = {item.userId}>
				<td> 
				<h3>{item.name}</h3>
				<p>{item.type}</p>
				<p>{item.level}</p>
				</td>
			</tr>
			);
		});

		return(
			<table>
	            <tbody>
	            	{storyNodes}
	            </tbody>
	        </table>
		);
	}
	
});