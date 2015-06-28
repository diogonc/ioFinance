angular.module("finance").controller("BalancePerMonthCtrl", function($scope, TransactionRepository) {
  $scope.itens = [];

  $scope.$on('$ionicView.beforeEnter', function() {
    var dates = ["06/14", "07/14", "08/14", "09/14"];
    var creditData = [{
      category: {
        "guid": "1",
        "name": "Aluguel",
        "type": "Crédito"
      },
      balance: [{
        date: "2014-06-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-07-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-08-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-09-01T00:00:00.000Z",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    }, {
      category: {
        "guid": "2",
        "name": "Salario",
        "type": "Crédito"
      },
      balance: [{
        date: "2014-06-01T00:00:00.000Z",
        value: 500
      }, {
        date: "2014-07-01T00:00:00.000Z",
        value: 510
      }, {
        date: "2014-08-01T00:00:00.000Z",
        value: 234.34
      }, {
        date: "2014-09-01T00:00:00.000Z",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    }];
    var totalCredit = {
      balance: [{
        date: "2014-06-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-07-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-08-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-09-01T00:00:00.000Z",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    };

    var debitData = [{
      category: {
        "guid": "3",
        "name": "Alice",
        "type": "Débito"
      },
      balance: [{
        date: "2014-06-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-07-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-08-01T00:00:00.000Z",
        value: 447.71
      }, {
        date: "2014-09-01T00:00:00.000Z",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    }, {
      category: {
        "guid": "4",
        "name": "Carro",
        "type": "Débito"
      },
      balance: [{
        date: "2014-06-01T00:00:00.000Z",
        value: 500
      }, {
        date: "2014-07-01T00:00:00.000Z",
        value: 510
      }, {
        date: "2014-08-01T00:00:00.000Z",
        value: 234.34
      }, {
        date: "2014-09-01T00:00:00.000Z",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    }];

    var totalDebit = {
      balance: [{
        date: "2014-06-01T00:00:00.000Z",
        value: 500.23
      }, {
        date: "2014-07-01T00:00:00.000Z",
        value: 500.23
      }, {
        date: "2014-08-01T00:00:00.000Z",
        value: 500.23
      }, {
        date: "2014-09-01T00:00:00.000Z",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    };

    $scope.itens = {
      dates: dates,
      creditCategories: creditData,
      totalCredit: totalCredit,
      debitCategories: debitData,
      totalDebit: totalDebit
    };
  });
});
