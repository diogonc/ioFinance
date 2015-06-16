angular.module("finance").controller("categoryCtrl", function ($scope, CategoryRepository) {
	$scope.itens = CategoryRepository.getAll();
	$scope.types = [
		{value :'credit', text: 'Crédito'},
		{value :'debit', text: 'Débito'},
		{value :'creditTransfer', text: 'Transferência de crédito'},
		{value :'debitTransfer', text: 'Transferência de débito'}	
	];
	$scope.newItem = new Category();
	$scope.addItem = addItem;
	$scope.editItem = editItem;
	$scope.deleteItem = deleteItem;

	function addItem(newItem) {
		console.log(newItem);
		var item = new Category(newItem);
		if(item.valid){	
			CategoryRepository.save(item);
			$scope.newItem = new Category();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;
	};

	function editItem(item) {
		$scope.newItem.guid = item.guid;
		$scope.newItem.name = item.name;
		$scope.newItem.type = item.type;
	}
	
	function deleteItem(item){
		CategoryRepository.delete(item);
		$scope.newItem = new Category();
	}
});