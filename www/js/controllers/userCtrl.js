angular.module("finance").controller("userCtrl", function ($scope, UserRepository) {
	$scope.itens = UserRepository.getAll();
	$scope.newItem = new User();
	$scope.addItem = addItem;
	$scope.editItem = editItem;
	$scope.deleteItem = deleteItem;

	function addItem(newItem) {
		var item = new User(newItem);
		if(item.valid){	
			UserRepository.save(item);
			$scope.newItem = new User();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;
	};

	function editItem(item) {
		$scope.newItem.guid = item.guid;
		$scope.newItem.login = item.login;
		$scope.newItem.password = item.password;
		$scope.newItem.property = item.property;
	}
	
	function deleteItem(item){
		UserRepository.delete(item);
		$scope.newItem = new User();
	}
});