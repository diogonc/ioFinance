angular.module('finance').factory('Sync', function($http, AccountRepository, CategoryRepository, TransactionRepository) {
  var baseUrl = 'http://diogonc.azurewebsites.net/SyncPost/';
  //var baseUrl = 'http://localhost:50164/SyncPost/';  
    
  function getAccounts(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    }
    return $http.get(baseUrl + 'getAccounts', {params : params}).then(function(response) {
      var dataConverted =  accountSync.convertAccount(response.data);
      AccountRepository.updateAllData(dataConverted);
    });
  };

  function getCategories(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    }
    return $http.get(baseUrl + 'getCategories', {params : params}).then(function(response) {
      var dataConverted =  categorySync.convertCategory(response.data);
      CategoryRepository.updateAllData(dataConverted);
    });
  };

  function getTransactions(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    }
    return $http.get(baseUrl + 'getTransactions', {params : params}).then(function(response) {
      var dataConverted =  transactionSync.convertTransaction(response.data);
      TransactionRepository.updateAllData(dataConverted);
    });
  };
  
  return {
    getAccounts: getAccounts,
    getCategories: getCategories,
    getTransactions: getTransactions
  };
});
