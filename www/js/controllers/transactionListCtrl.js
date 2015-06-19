angular.module("finance").controller("TransactionListCtrl", function ($scope, $location, TransactionRepository) {
	$scope.itens = [];
	$scope.newItem = newItem;
	
	function newItem(){
		$location.path('app/transactions/0');
	};

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.itens = TransactionRepository.getAll();
	});
});