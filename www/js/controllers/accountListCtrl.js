angular.module("finance").controller("AccountListCtrl", function ($scope, $location, AccountRepository, Sync) {
	$scope.itens = AccountRepository.getAll();
	$scope.editItem = editItem;
	$scope.import = importData;
	$scope.novo = novo;

console.log($scope.itens);
	function novo(){
		$location.path('app/accounts/0');
	};

	function editItem(item) {
		$scope.newItem.guid = item.guid;
		$scope.newItem.name = item.name;
	};
	
	function importData(){
		var data = Sync.getAccounts('username', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1);
		$scope.itens = data;
		AccountRepository.updateAllData(data);
	};
});