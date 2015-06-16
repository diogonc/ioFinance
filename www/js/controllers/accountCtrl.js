angular.module("finance").controller("AccountCtrl", function ($scope, $location, AccountRepository) {
	$scope.itens = AccountRepository.getAll();
	$scope.item = new Account();
	$scope.addItem = addItem;
	$scope.deleteItem = deleteItem;
	$scope.back = back;

	function addItem(newItem) {
		var item = new Account(newItem);
		if(item.valid){	
			AccountRepository.save(item);
			$scope.newItem = new Account();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;
	};
	
	function deleteItem(item){
		AccountRepository.delete(item);
		$scope.newItem = new Account();
	}
	
	function back(){
		$location.path('app/accounts');
	}
});