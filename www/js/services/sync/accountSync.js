angular.module('finance').factory('AccountSync', function ($http, toastr, AccountRepository) {

  function getAccounts(username, token, propertyId, baseUrl, callback) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    return $http.get(baseUrl + 'getAccounts', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido'){
        callback();
        return;
      }

      var dataConverted = accountConverter.convertAccount(response.data);
      AccountRepository.updateAllData(dataConverted);
      toastr.success('contas atualizadas!');
      callback();
    });
  };

  function saveAccounts(username, token, propertyId, baseUrl, callback) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = accountConverter.convertToPost(AccountRepository.getAll());
    var numberOfItens = data.length;
    var itensSaved = 0;
    if(numberOfItens === 0)
      callback();

    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveAccount', element, { headers: params }).then(function (response) {
        itensSaved++;
        if (response.data === 'OK')
          toastr.success('conta ' + element.Name + ' salva!');

        if(itensSaved === numberOfItens)
          callback();
      });
    }, this);
  };

  return {
    getAccounts: getAccounts,
    saveAccounts: saveAccounts
  };
});
