angular.module("finance").controller("TransactionListCtrl", function ($scope, $stateParams, $location, TransactionRepository, CategoryRepository, AccountRepository) {
	$scope.categories = [];
	$scope.accounts = [];
	$scope.itens = [];
	$scope.newItem = newItem;
	$scope.search = search;

	function newItem(){
		$location.path('app/transactions/0');
	};

	function search(item){
		$location.path('app/transactions').search({year: item.year, month: item.month, categoryGuid: item.category.guid, accountGuid: item.account.guid});
	};

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.categories = CategoryRepository.getAll();
		$scope.categories.push({guid:0, name:'Todas'});
		$scope.accounts = AccountRepository.getAll();
		$scope.accounts.push({guid:0, name:'Todas'});

		var hoje = new Date();
		var year = hoje.getFullYear();
		var month = hoje.getMonth() + 1;
		var categoryGuid = '0';
		var accountGuid = '0';

		if(typeof $stateParams.year !== 'undefined')
		 	year = parseInt($stateParams.year);
		if(typeof $stateParams.month !== 'undefined')
		 	month = parseInt($stateParams.month);
		if(typeof $stateParams.categoryGuid !== 'undefined')
		 	categoryGuid = String($stateParams.categoryGuid);
		if(typeof $stateParams.accountGuid !== 'undefined')
		 	accountGuid = String($stateParams.accountGuid);

		var index = findIndex(categoryGuid, $scope.categories);
		var category = $scope.categories[index];
		var indexOfAccount = findIndex(accountGuid, $scope.accounts);
		var account = $scope.accounts[indexOfAccount];

		$scope.item = {year: year , month: month, category: category, account: account};
		$scope.itens = TransactionRepository.getAll($scope.item.year, $scope.item.month, $scope.item.category.guid, $scope.item.account.guid);
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
