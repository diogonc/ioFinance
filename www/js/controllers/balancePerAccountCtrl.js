angular.module("finance").controller("BalancePerAccountCtrl", function($scope, $stateParams, $location, TransactionRepository, Auth) {
  $scope.itens = [];
  $scope.item = {
    date: new Date()
  };
  $scope.search = search;

  function search(item) {
    $location.path('app/balance-per-account').search({
      date: util.dateToUs(item.date)
    });
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    Auth.verify();

    if (typeof $stateParams.date !== 'undefined')
      $scope.item.date = util.usToDate($stateParams.date);
    var report = new Report();
    var data = TransactionRepository.getAll();
    $scope.itens = report.getReport(data, $scope.item.date);
    $scope.total = report.getTotal();
  });
});
