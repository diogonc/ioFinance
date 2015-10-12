 angular.module('finance').factory('TransactionSync', function ($http, toastr, TransactionRepository, ApiSync) {

  function getTransactions(auth, baseUrl, callback) {
    var api = ApiSync.init(baseUrl, auth, 'transaction', 'lançamento', TransactionRepository, transactionConverter);

    return api.get(callback);
  };

  function saveTransactions(auth, baseUrl, callback) {
    var api = ApiSync.init(baseUrl, auth, 'transaction', 'lançamento', TransactionRepository, transactionConverter);

    return api.save(callback);
  };

  return {
    getTransactions: getTransactions,
    saveTransactions: saveTransactions
  };
});
