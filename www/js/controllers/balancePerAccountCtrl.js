angular.module("finance").controller("BalancePerAccountCtrl", function($scope,$stateParams, $location, TransactionRepository) {
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
    if (typeof $stateParams.date !== 'undefined')
      $scope.item.date = util.usToDate($stateParams.date);
    var report = new Report();
    var dados = TransactionRepository.getAllTransactions($scope.item.date);
    $scope.itens = report.gerarRelatorio(dados);
  });
});
