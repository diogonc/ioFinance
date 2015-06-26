angular.module("finance").controller("BalancePerAccountCtrl", function ($scope, TransactionRepository) {
	$scope.itens = [];

	$scope.$on('$ionicView.beforeEnter', function() {

		$scope.itens = [
			{account:'CC caixa Diogo', balance:45646.57},
			{account:'CC caixa Diogo', balance:45646.57},
			{account:'CC caixa Diogo', balance:45646.57},
			{account:'CC caixa Diogo', balance:45646.57}
		];
	});
});
