angular.module("finance").controller("UserListCtrl", function ($scope, $location, toastr, UserRepository, Sync) {
	$scope.itens = UserRepository.getAll();
	$scope.newItem = newItem;
	$scope.importData = importData;

	function newItem(){
		$location.path('app/users/0');
	};
	
	function importData(){
		var credentials = $scope.itens[0];
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = 1;
		
		Sync.getAccounts(username, token, propertyId);
		Sync.getCategories(username, token, propertyId);
		Sync.getTransactions(username, token, propertyId);
		
		toastr.success('Dados importados com sucesso!');
	};
});