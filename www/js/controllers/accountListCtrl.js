angular.module("finance").controller("AccountListCtrl", function ($scope, $location, AccountRepository) {
	$scope.itens = AccountRepository.getAll();
	$scope.newItem = newItem;

	function newItem(){
		$location.path('app/accounts/0');
	};
});