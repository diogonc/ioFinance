angular.module("finance").controller("BalancePerMonthCtrl", function($scope, TransactionRepository) {
  $scope.itens = [];

  $scope.$on('$ionicView.beforeEnter', function() {
    var report = new BalancePerMonthReport();
    var data = TransactionRepository.getAllTransactions();

    $scope.itens = report.GetBalancePerMonth(data);
  });
});
