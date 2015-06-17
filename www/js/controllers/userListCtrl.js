angular.module("finance").controller("UserListCtrl", function ($scope, $location, UserRepository, Sync) {
	$scope.itens = UserRepository.getAll();
	$scope.newItem = newItem;
	$scope.importAccounts = importAccounts;

	function newItem(){
		$location.path('app/users/0');
	};
	
	function importAccounts(){
		var data = Sync.getAccounts('username', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1);
	};
});