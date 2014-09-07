photographerModule.controller('photographerController',['$scope', function($scope) {
	$scope.postList = [
		{
			title: "I am looking for a wedding photographer",
			location: "Quezon City",
			timePosted: "Fri Sep 05 2014 18:24:18",
			face : '/images/portfolio_list/pete.jpg',
			budget: 30000
		},
		{
			title: "I am looking for a birthday photographer",
			location: "Malabon City",
			timePosted: "Fri Sep 05 2014 18:24:18",
			face : '/images/portfolio_list/emerson.jpg',
			budget: 4500
		},
		{
			title: "I am looking for a photographer",
			location: "Cavite City",
			timePosted: "Fri Sep 05 2014 18:24:18",
			face : '/images/portfolio_list/frietz.jpg',
			budget: 3000
		}		
	];

}]);
