angular.module("finance").controller("BalancePerMonthCtrl", function($scope, $stateParams, $location, TransactionRepository, Auth) {
  $scope.itens = [];
  $scope.item = {
    months: 1
  };
  $scope.search = search;
  $scope.searchTransaction = searchTransaction;

  function searchTransaction (year, month, categoryGuid){
    $location.path('app/transactions').search({
      year: '20' + year,
      month: month,
      categoryGuid: categoryGuid
    });
  }

  function search(item) {
    $location.path('app/balance-per-month').search({
      months: item.months
    });
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    Auth.verify();
    
    var report = new BalancePerMonthReport();
    var data = TransactionRepository.getAll();

    var numberOfMonths = 1;
    if (typeof $stateParams.months !== 'undefined')
      numberOfMonths = parseInt($stateParams.months);

    $scope.item.months = numberOfMonths;
    $scope.itens = report.GetBalancePerMonth(data, numberOfMonths);
  });
});
