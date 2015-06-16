angular.module("finance").controller("AccountsCtrl", function ($scope, AccountRepository, Sync) {
	$scope.itens = AccountRepository.getAll();
	$scope.newItem = new Account();
	$scope.addItem = addItem;
	$scope.editItem = editItem;
	$scope.deleteItem = deleteItem;
	$scope.import = importData;

	function addItem(newItem) {
		var item = new Account(newItem);
		if(item.valid){	
			AccountRepository.save(item);
			$scope.newItem = new Account();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;
	};

	function editItem(item) {
		$scope.newItem.guid = item.guid;
		$scope.newItem.name = item.name;
	}
	
	function deleteItem(item){
		AccountRepository.delete(item);
		$scope.newItem = new Account();
	}
	
	function importData(){
		var data = Sync.getAccounts('username', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1);
		$scope.itens = data;
		AccountRepository.updateAllData(data);
	}
});