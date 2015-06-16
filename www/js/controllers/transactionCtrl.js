angular.module("finance").controller("TransactionCtrl", function ($scope, TransactionRepository, AccountRepository, CategoryRepository) {
	$scope.itens = TransactionRepository.getAll();
	$scope.categories = CategoryRepository.getAll();
	$scope.accounts = AccountRepository.getAll();
	$scope.newItem = new Transaction();
	$scope.addItem = addItem;
	$scope.editItem = editItem;
	$scope.deleteItem = deleteItem;

	function addItem(newItem) {
		var item = new Transaction(newItem);
		if(item.valid){	
			TransactionRepository.save(item);
			$scope.newItem = new Transaction();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;
	};

	function editItem(item) {
		$scope.newItem.guid = item.guid;
		$scope.newItem.account = item.account;
		$scope.newItem.category = item.category;
		$scope.newItem.description = item.description;
		$scope.newItem.date = new Date(item.date);
		$scope.newItem.value = item.value;
	}
	
	function deleteItem(item){
		TransactionRepository.delete(item);
		$scope.newItem = new Transaction();
	}
});