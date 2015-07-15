angular.module("finance").controller("BalancePerMonthCtrl", function($scope, $stateParams, $location, TransactionRepository) {
  $scope.itens = [];
  $scope.item = {
    months: 1
  };
  $scope.search = search;

  function search(item) {
    $location.path('app/balance-per-month').search({
      months: item.months
    });
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    var report = new BalancePerMonthReport();
    var data = TransactionRepository.getAllTransactions();

    var numberOfMonths = 1;
    if (typeof $stateParams.months !== 'undefined')
      numberOfMonths = parseInt($stateParams.months);

    $scope.item.months = numberOfMonths;
    $scope.itens = report.GetBalancePerMonth(data, numberOfMonths);
  });
});
