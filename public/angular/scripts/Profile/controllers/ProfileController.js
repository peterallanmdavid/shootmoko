profileModule.controller('profileController',['$scope','$location', function($scope,$location) {
	
	$scope.goto = function(path)
	{
		$location.path(path);
	}

  $scope.activeIndex = 0;
  $scope.tabs = [
    {id:1, title: 'News'},
    {id:2, title: 'Events' },
    {id:3, title: 'Open Shoots'}
  ];
  
  $scope.tabselected = "c1";


  $scope.onTabSelected = function (tab){
    $scope.tabselected  = tab;
    $scope.newsList = [];
    $scope.getList(tab);
  };

  $scope.contentList = [
    {
      categoryId: 2,
      Title: ' Wedding Anniversary Photo Shoots',
      Description: 'Photographer needed for a wedding anniversary of Tatang and Manang',
      Budget: '5,000- 10,000',
      Location: 'San Juan Street, Banda Doon, Caloocan Manila',
      Participants:'n/a'
    },
    {
      categoryId: 2,
      Title: ' Gold Anniversary Photo Shoots',
      Description: 'Photographer needed for a wedding anniversary of Tatang and Manang',
      Budget: '5,000- 10,000',
      Location: 'San Juan Street, Banda Doon, Caloocan Manila',
      Participants:'n/a'
    },
    {
      categoryId: 1,
      Title: 'Haring Bastos Photography Club EB',
      Description: 'Meetup for the Haring Bastos Photography club',
      Budget: 'n/a',
      Location: 'Ayala Triangle',
      Participants:'n/a'
    },
    {
      categoryId: 1,
      Title: 'ShootMoko Maintenance',
      Description: 'Please be Adviced that we will be having maintenance during our football games',
      Budget: 'N/A',
      Location: 'Blue Pitch',
     Participants:'n/a'
    },
    {
      categoryId: 3,
      Title: 'Zuellig Babes Open Shoot',
      Description: 'Participants',
      Budget: 'N/A',
      Location: 'Blue Pitch',
      Participants:'Kim Ampawa, Phenelope Juliano'
    }

  ];
  
  $scope.newsList = [];

  $scope.getList = function(tab){
    var newsList = $scope.contentList;
     for (var i = 0; i < newsList.length; i++) {
        if (newsList[i].categoryId==tab){
          $scope.newsList.push(newsList[i]);
        }
    }
  };


 }]);
