angular.module("finance").controller("CategoryCtrl", function ($scope, $location, $stateParams, CategoryRepository) {
	$scope.types = ['Crédito', 'Débito', 'Transferência de crédito', 'Transferência de débito'];	
	$scope.addItem = addItem;
	$scope.deleteItem = deleteItem;
	$scope.back = back;
	$scope.item = {};
	$scope.ehEdicao = false;
	$scope.valid = true;
	$scope.errors = [];
	
	var guid = $stateParams.Id;
	if (guid !== '0') {
		var item = CategoryRepository.get(guid);
		$scope.item = item;
		$scope.ehEdicao = true;
	}

	function addItem(newItem) {
		var item = new Category(newItem);
		if (item.valid) {
			CategoryRepository.save(item);
			$scope.item = {};
			back();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;		
	};

	function deleteItem(item) {
		CategoryRepository.delete(item);
		$scope.item = {};
		back();
	}

	function back() {
		$location.path('app/categories');
	}
});