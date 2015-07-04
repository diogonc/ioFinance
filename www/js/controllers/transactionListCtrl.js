angular.module("finance").controller("TransactionListCtrl", function ($scope, $stateParams, $location, TransactionRepository, CategoryRepository) {
	$scope.categories = [];
	$scope.itens = [];
	$scope.newItem = newItem;
	$scope.search = search;

	function newItem(){
		$location.path('app/transactions/0');
	};

	function search(item){
		$location.path('app/transactions').search({year: item.year, month: item.month, categoryGuid: item.category.guid});
	};

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.categories = CategoryRepository.getAll();
		$scope.categories.push({guid:0, name:'Todas'});
		var hoje = new Date();
		var year = hoje.getFullYear();
		var month = hoje.getMonth() + 1;
		var categoryGuid = '0';

		if(typeof $stateParams.year !== 'undefined')
		 	year = parseInt($stateParams.year);
		if(typeof $stateParams.month !== 'undefined')
		 	month = parseInt($stateParams.month);
		if(typeof $stateParams.categoryGuid !== 'undefined')
		 	categoryGuid = String($stateParams.categoryGuid);

		var index = findIndex(categoryGuid, $scope.categories);
		var category = $scope.categories[index];
		$scope.item = {year: year , month: month, category: category};
		$scope.itens = TransactionRepository.getAll($scope.item.year, $scope.item.month, $scope.item.category.guid);
	});

	function findIndex(guid, itens) {
    var length = itens.length;
    for (var i = 0; i < length; i++) {
      if (String(itens[i].guid) === guid)
        return i;
    }
    return -1;
  };
});
