angular.module('finance').factory('TransactionSync', function ($http, toastr, TransactionRepository) {

  function getTransactions(username, token, propertyId, baseUrl, callback) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    }
    return $http.get(baseUrl + 'getTransactions', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido'){
        toastr.success('usuário inválido!');
        callback();
        return;
      }

      var dataConverted = transactionConverter.convertTransaction(response.data);
      TransactionRepository.updateAllData(dataConverted);
      toastr.success('lançamentos atualizados!');
      callback();
    });
  };

  function saveTransactions(username, token, propertyId, baseUrl, callback) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = transactionConverter.convertToPost(TransactionRepository.getAllTransactions());
    var numberOfItens = data.length;
    var itensSaved = 0;
    if(numberOfItens === 0)
      deleteTransactions(username, token, propertyId, baseUrl, callback);

    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveTransaction', element, { headers: params }).then(function (response) {
        itensSaved++;
        onSaveTransaction(element, response);

        if(itensSaved === numberOfItens)
          deleteTransactions(username, token, propertyId, baseUrl, callback);
      });
    }, this);
  };

  function onSaveTransaction(element, response) {
    if (response.data.Status === 'OK') {
      toastr.success(response.data.Message);
      TransactionRepository.changeId(element.Id, String(response.data.Item.Id));
    }
    else {
      toastr.warning(response.data.Message);
    }
  };

  function deleteTransactions(username, token, propertyId, baseUrl, callback) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = transactionConverter.convertToDelete(TransactionRepository.getAllDeleted());
    var numberOfItens = data.length;
    var itensSaved = 0;
    if(numberOfItens === 0)
      callback();

    data.forEach(function (element) {
      return $http.post(baseUrl + 'DeleteTransaction', element, { headers: params }).then(function (response) {
        itensSaved++;
        if (response.data.Status === 'OK')
        toastr.success('lançamento excluido!');

        if(itensSaved === numberOfItens){
          TransactionRepository.clearDeleted();
          callback();
        }
      });
    }, this);
  };

  return {
    getTransactions: getTransactions,
    saveTransactions: saveTransactions
  };
});
