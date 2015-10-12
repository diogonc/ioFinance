angular.module("finance").controller("TransferCtrl", function($scope, $window, $location, $stateParams, toastr, TransactionRepository, AccountRepository, CategoryRepository, Auth) {
  $scope.convertDate = convertDate;
  $scope.itens = TransactionRepository.getAll();
  $scope.accounts = AccountRepository.getAll();
  $scope.addItem = addItem;
  $scope.back = back;
  $scope.item = {
    date: new Date()
  };
  $scope.valid = true;
  $scope.errors = [];

  Auth.verify();

  function addItem(newItem, goBack) {
    var creditCategory = CategoryRepository.getCreditTransfer();
    var debitCategory = CategoryRepository.getDebitTransfer();

    var creditTransfer = new Transaction({      
      description: newItem.description,
      category: creditCategory,
      account: newItem.destinyAccount,
      date: newItem.date,
      value: newItem.value
    });

    var debitTransfer = new Transaction({      
      description: newItem.description,
      category: debitCategory,
      account: newItem.originAccount,
      date: newItem.date,
      value: newItem.value
    });

    if (creditTransfer.valid && debitTransfer.valid) {
      TransactionRepository.save(debitTransfer);
      TransactionRepository.save(creditTransfer);

      $scope.item = {date: new Date()};

      toastr.success('Registro gravado com sucesso!');
      
      if(goBack)
        back();
    }
    $scope.valid = debitTransfer.valid;
    $scope.errors = debitTransfer.errors;
  };

  function back() {
    if ($window.history.length > 1)
      $window.history.back();
		else
			$location.path('app/transactions');
  }

  //'2015-06-19T00:00:00.000Z'
  function convertDate(dateInString) {
    var dateStringPart = dateInString.split('T')[0];
    var dateParts = dateStringPart.split('-');
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  }
});
