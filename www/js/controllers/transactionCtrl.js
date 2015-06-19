angular.module("finance").controller("TransactionCtrl", function ($scope, $location, $stateParams, toastr, TransactionRepository, AccountRepository, CategoryRepository) {
	$scope.itens = TransactionRepository.getAll();
	$scope.categories = CategoryRepository.getAll();
	$scope.accounts = AccountRepository.getAll();
	$scope.addItem = addItem;
	$scope.deleteItem = deleteItem;
	$scope.back = back;
	$scope.item = {date: new Date()};
	$scope.ehEdicao = false;
	$scope.valid = true;
	$scope.errors = [];

	var guid = $stateParams.Id;
	if (guid !== '0') {
		var item = TransactionRepository.get(guid);
		$scope.item.guid = item.guid;
		$scope.item.category = item.category;
		$scope.item.description = item.description;
		$scope.item.account = item.account;
		$scope.item.date = new Date(item.date);
		$scope.item.value = item.value;
		$scope.ehEdicao = true;
	}

	function addItem(newItem) {
		var item = new Transaction(newItem);
		if (item.valid) {
			TransactionRepository.save(item);
			$scope.item = {};
			toastr.success('Registro gravado com sucesso!');
			back();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;
	};
	
	function deleteItem(item) {
		TransactionRepository.delete(item);
		$scope.item = {};
		back();
	}

	function back() {
		$location.path('app/transactions');
	}
});