angular.module("finance").controller("AccountCtrl", function ($scope, $stateParams, $location, AccountRepository) {
	$scope.addItem = addItem;
	$scope.deleteItem = deleteItem;
	$scope.back = back;
	$scope.item = {};
	$scope.ehEdicao = false;
	$scope.valid = true;
	$scope.errors = [];

	var guid = $stateParams.Id;
	if (guid !== '0') {
		var item = AccountRepository.get(guid);
		$scope.item = item;
		$scope.ehEdicao = true;
	}

	function addItem(newItem) {
		var item = new Account(newItem);
		if (item.valid) {
			AccountRepository.save(item);
			$scope.item = {};
			back();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;		
	};

	function deleteItem(item) {
		AccountRepository.delete(item);
		$scope.item = {};
		back();
	}

	function back() {
		$location.path('app/accounts');
	}
});