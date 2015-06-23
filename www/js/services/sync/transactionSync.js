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
    var numberOfItens = data.length;
    var itensSaved = 0;
    toastr.success('Preparando para atualizar '+numberOfItens+' registros!');
    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveTransaction', element, { headers: params }).then(function (response) {
        itensSaved++;
        onSaveTransaction(element, response);
        if(itensSaved === numberOfItens)
          deleteTransactions(username, token, propertyId, baseUrl);
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

  function deleteTransactions(username, token, propertyId, baseUrl) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = transactionConverter.convertToDelete(TransactionRepository.getAllDeleted());
    var numberOfItens = data.length;
    var itensSaved = 0;
    data.forEach(function (element) {
      return $http.post(baseUrl + 'DeleteTransaction', element, { headers: params }).then(function (response) {
        itensSaved++;
        if (response.data.Status === 'OK')
          toastr.success('lançamento excluido!');
          
        if(itensSaved === numberOfItens)  
          TransactionRepository.clearDeleted();
      });
    }, this);
  };

  return {
    getTransactions: getTransactions,
    saveTransactions: saveTransactions
  };
});
