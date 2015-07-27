angular.module("finance").controller("CategoryCtrl", function ($scope, $window, $stateParams, toastr, CategoryRepository) {
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
			toastr.success('Registro gravado com sucesso!');
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
		$window.history.back();
	}
});
