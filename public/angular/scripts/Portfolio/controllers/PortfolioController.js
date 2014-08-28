portfolioModule.controller('portfolioController',['$scope', function($scope) {
	
	   $scope.todos = [
      {
        face : '/images/portfolio_list/peter.jpg',
        name: 'Peter Allan David',
        alias: 'PeteBull',
        tagline: "Wag kang titingin, mahuhumaling ka sa akin"
      },
      {
        face : '/images/portfolio_list/emerson.jpg',
        name: 'Emerson Barrion',
        alias: 'Haring Bastos',
        tagline: "Wag mo kong pipilitin, yari ka sa akin"
      },
      {
        face : '/images/portfolio_list/frietz.jpg',
        name: 'Frietz Osorio',
        alias: 'Leader of the Pack',
        tagline: "Wag kang Ngingiti, kung ayaw mong makiliti"
      },
      {
        face : '/images/portfolio_list/james.jpg',
        name: 'James Lopena',
        alias: 'LoverBoy',
        tagline: "Wag kang pipikit, kung ayaw mong kong lumapit :)"
      },
    ]
 }]);
