angular.module("finance").controller("BalancePerMonthCtrl", function($scope, TransactionRepository) {
  $scope.itens = [];

  $scope.$on('$ionicView.beforeEnter', function() {
    var dates = ["06/14", "07/14", "08/14", "09/14"];
    var creditCategories = [{
      category: {
        "guid": "1",
        "name": "Aluguel",
        "type": "Crédito"
      },
      balance: [{
        date: "06/14",
        value: 447.71
      }, {
        date: "07/14",
        value: 447.71
      }, {
        date: "08/14",
        value: 447.71
      }, {
        date: "09/14",
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
        date: "06/14",
        value: 500
      }, {
        date: "07/14",
        value: 510
      }, {
        date: "08/14",
        value: 234.34
      }, {
        date: "09/14",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    }];
    var totalCredit = {
      balance: [{
        date: "06/14",
        value: 447.71
      }, {
        date: "07/14",
        value: 447.71
      }, {
        date: "08/14",
        value: 447.71
      }, {
        date: "09/14",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    };

    var debitCategories = [{
      category: {
        "guid": "3",
        "name": "Alice",
        "type": "Débito"
      },
      balance: [{
        date: "06/14",
        value: 447.71
      }, {
        date: "07/14",
        value: 447.71
      }, {
        date: "08/14",
        value: 447.71
      }, {
        date: "09/14",
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
        date: "06/14",
        value: 500
      }, {
        date: "07/14",
        value: 510
      }, {
        date: "08/14",
        value: 234.34
      }, {
        date: "09/14",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    }];

    var totalDebit = {
      balance: [{
        date: "06/14",
        value: 500.23
      }, {
        date: "07/14",
        value: 500.23
      }, {
        date: "08/14",
        value: 500.23
      }, {
        date: "09/14",
        value: 447.71
      }],
      average: 2342,
      sum: 234234
    };

    $scope.itens = {
      dates: dates,
      creditCategories: creditCategories,
      totalCredit: totalCredit,
      debitCategories: debitCategories,
      totalDebit: totalDebit
    };
  });
});
