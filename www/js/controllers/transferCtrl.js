angular.module("finance").controller("TransferCtrl", function($scope, $window, $location, $stateParams, toastr, TransactionRepository, AccountRepository, CategoryRepository) {
  $scope.convertDate = convertDate;
  $scope.itens = TransactionRepository.getAll();
  $scope.accounts = AccountRepository.getAll();
  $scope.back = back;
  $scope.item = {
    date: new Date()
  };
  $scope.valid = true;
  $scope.errors = [];

  $scope.$on('$ionicView.beforeEnter', function() {

  });

  function addItem(newItem) {
    var item = new Transaction(newItem);
    if (item.valid) {
      TransactionRepository.save(item);
      $scope.item = {};
      toastr.success('Registro gravado com sucesso!');
      back();
    }
    $scope.valid = item.valid;
    $scope.errors = item.errors;
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
