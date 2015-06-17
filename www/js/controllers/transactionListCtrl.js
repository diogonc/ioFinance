angular.module("finance").controller("TransactionListCtrl", function ($scope, $location, TransactionRepository) {
	$scope.itens = TransactionRepository.getAll();
	$scope.newItem = newItem;
	
	function newItem(){
		$location.path('app/transactions/0');
	};
});