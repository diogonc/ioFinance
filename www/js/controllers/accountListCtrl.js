angular.module("finance").controller("AccountListCtrl", function ($scope, $location, AccountRepository, Sync) {
	$scope.itens = AccountRepository.getAll();
	$scope.import = importData;
	$scope.newItem = newItem;

	function newItem(){
		$location.path('app/accounts/0');
	};
	
	function importData(){
		var data = Sync.getAccounts('username', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1);
		$scope.itens = data;
		AccountRepository.updateAllData(data);
	};
});