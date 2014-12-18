


var PhotogProfilePortfolio = React.createClass({
	getInitialState: function(){
	return {
			portfolioPhotos : [
				{pid: "p1", url: "/images/portfolio_list/gallery.png"},
				{pid: "p2", url: "/images/portfolio_list/gallery.png"},
				{pid: "p3", url: "/images/portfolio_list/gallery.png"},
				{pid: "p4", url: "/images/portfolio_list/gallery.png"}
			]
		};
	},
	render: function(){
		var portfolios = this.state.portfolioPhotos.map(function (photos){
			return(
				<div className = "col-md-3" key = {photos.pid}>
					<a href = "#"><img src = {photos.url}/></a>
				</div>
			);

		});

		return(
			<div>
				<h4>Portfolios </h4>
				{portfolios}
			</div>
		);
	}
});