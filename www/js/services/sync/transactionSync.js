angular.module('finance').factory('TransactionSync', function ($http, toastr, TransactionRepository) {

  function getTransactions(auth, baseUrl, callback) {
    return $http.get(baseUrl + 'transaction', { headers: auth }).then(function (response) {
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

  function saveTransactions(auth, baseUrl, callback) {
    var data = transactionConverter.convertToPost(TransactionRepository.getAllTransactions());
    var numberOfItens = data.length;
    var itensSaved = 0;
    
    if(numberOfItens === 0)
      deleteTransactions(auth, baseUrl, callback);

    data.forEach(function (element) {
      return $http.post(baseUrl + 'transaction', element, { headers: auth }).then(function (response) {
        itensSaved++;
        onSaveTransaction(element, response);

        if(itensSaved === numberOfItens)
          deleteTransactions(auth, baseUrl, callback);
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

  function deleteTransactions(auth, baseUrl, callback) {
    var data = transactionConverter.convertToDelete(TransactionRepository.getAllDeleted());
    var numberOfItens = data.length;
    var itensSaved = 0;

    if(numberOfItens === 0)
      callback();

    data.forEach(function (element) {
      return $http.post(baseUrl + 'DeleteTransaction', element, { headers: auth }).then(function (response) {
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
