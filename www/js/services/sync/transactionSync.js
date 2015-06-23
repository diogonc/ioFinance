angular.module('finance').factory('TransactionSync', function ($http, toastr, TransactionRepository) {

  function getTransactions(username, token, propertyId, baseUrl) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    }
    return $http.get(baseUrl + 'getTransactions', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido')
        return;

      var dataConverted = transactionConverter.convertTransaction(response.data);
      TransactionRepository.updateAllData(dataConverted);
      toastr.success('lançamentos atualizados!');
    });
  };

  function saveTransactions(username, token, propertyId, baseUrl) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = transactionConverter.convertToPost(TransactionRepository.getAllTransactions());
    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveTransaction', element, { headers: params }).then(function (response) {
        onSaveTransaction(element, response);
      });
    }, this);
    deleteTransactions(username, token, propertyId, baseUrl);
  };

  function onSaveTransaction(element, response) {
    if (response.data.Status === 'OK') {
      toastr.success(response.data.Message);
      TransactionRepository.changeId(element.Id, String(response.data.Item.Id));
    }
    else {
      toastr.warning(response.data.Message);
    }
  }

  function deleteTransactions(username, token, propertyId, baseUrl) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = transactionConverter.convertToDelete(TransactionRepository.getAllDeleted());
    data.forEach(function (element) {
      return $http.post(baseUrl + 'DeleteTransaction', element, { headers: params }).then(function (response) {
        if (response.data.Status === 'OK')
          toastr.success('lançamento excluido!');
        TransactionRepository.clearDeleted();
      });
    }, this);
  };

  return {
    getTransactions: getTransactions,
    saveTransactions: saveTransactions
  };
});
