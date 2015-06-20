angular.module('finance').factory('Sync', function ($http, toastr, AccountRepository, CategoryRepository, TransactionRepository) {
  var baseUrl = 'http://diogonc.azurewebsites.net/Sync/';
  //var baseUrl = 'http://localhost:50164/Sync/';  
    
  function getAccounts(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    return $http.get(baseUrl + 'getAccounts', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido')
        return;

      var dataConverted = accountSync.convertAccount(response.data);
      AccountRepository.updateAllData(dataConverted);
    });
  };

  function saveAccounts(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = accountSync.convertToPost(AccountRepository.getAll());
    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveAccount', element, { headers: params }).then(function (response) {
        if(response.data === 'OK')
          toastr.success('conta '+element.name+' salva!');
      });
    }, this);
  };

  function getCategories(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    return $http.get(baseUrl + 'getCategories', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido')
        return;

      var dataConverted = categorySync.convertCategory(response.data);
      CategoryRepository.updateAllData(dataConverted);
    });
  };

  function saveCategories(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = categorySync.convertToPost(CategoryRepository.getAll());
    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveCategory', element, { headers: params }).then(function (response) {
        if(response.data === 'OK')
          toastr.success('categoria '+element.name+' salva!');
      });
    }, this);
  };

  function getTransactions(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    }
    return $http.get(baseUrl + 'getTransactions', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido')
        return;

      var dataConverted = transactionSync.convertTransaction(response.data);
      TransactionRepository.updateAllData(dataConverted);
    });
  };
  
  function saveTransactions(username, token, propertyId) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = transactionSync.convertToPost(TransactionRepository.getAllTransactions());
    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveTransaction', element, { headers: params }).then(function (response) {
        if(response.data === 'OK')
          toastr.success('lançamento '+element.Value+' salvo!');
      });
    }, this);
  };

  return {
    getAccounts: getAccounts,
    saveAccounts: saveAccounts,
    getCategories: getCategories,
    saveCategories: saveCategories,
    getTransactions: getTransactions,
    saveTransactions: saveTransactions
  };
});
