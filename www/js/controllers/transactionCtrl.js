angular.module("finance").controller("TransactionCtrl", function($scope, $window, 
        $location, $stateParams, toastr, TransactionRepository, AccountRepository,
        CategoryRepository, Auth, Sync)
{
  $scope.convertDate = convertDate;
  $scope.itens = TransactionRepository.getAll();
  $scope.categories = CategoryRepository.getAll();
  $scope.accounts = AccountRepository.getAll();
  $scope.addItem = addItem;
  $scope.deleteItem = deleteItem;
  $scope.back = back;
  $scope.item = {
    date: new Date()
  };
  $scope.ehEdicao = false;
  $scope.valid = true;
  $scope.errors = [];

  $scope.$on('$ionicView.beforeEnter', function() {
    Auth.verify();

    var guid = $stateParams.Id;
    if (guid !== '0') {
      var item = TransactionRepository.get(guid);
      $scope.item.guid = item.guid;
      $scope.item.category = item.category;
      $scope.item.description = item.description;
      $scope.item.account = item.account;
      $scope.item.date = convertDate(item.date);
      $scope.item.value = item.value;
      $scope.ehEdicao = true;
    }

    if($scope.accounts.length === 1)
      $scope.item.account = $scope.accounts[0];
  });

  function addItem(newItem, goBack) {
    var item = new Transaction(newItem);
    if (item.valid) {
      TransactionRepository.save(item);
      $scope.item = {date: new Date()};
      toastr.success('Registro gravado com sucesso!');
      
      Sync.update();

      if(goBack)
        back();
    }
    $scope.valid = item.valid;
    $scope.errors = item.errors;
  };

  function deleteItem(item) {
    TransactionRepository.delete(item);
    $scope.item = {};
    Sync.update();
    back();
  }

  function back() {
      $location.path('app/transactions');
  }

  //'2015-06-19T00:00:00.000Z'
  function convertDate(dateInString) {
    var dateStringPart = dateInString.split('T')[0];
    var dateParts = dateStringPart.split('-');
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  }
});
