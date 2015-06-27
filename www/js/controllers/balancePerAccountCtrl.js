angular.module("finance").controller("BalancePerAccountCtrl", function ($scope, TransactionRepository) {
	$scope.itens = [];

	$scope.$on('$ionicView.beforeEnter', function() {

		var report = new Report();
		var dados = TransactionRepository.getAllTransactions();
		console.log(dados);
		$scope.itens = report.gerarRelatorio(dados);

	});
});
