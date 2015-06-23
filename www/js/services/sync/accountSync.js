angular.module('finance').factory('AccountSync', function ($http, toastr, AccountRepository) {

  function getAccounts(username, token, propertyId, baseUrl) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    return $http.get(baseUrl + 'getAccounts', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido')
        return;

      var dataConverted = accountConverter.convertAccount(response.data);
      AccountRepository.updateAllData(dataConverted);
      toastr.success('contas atualizadas!');
    });
  };

  function saveAccounts(username, token, propertyId, baseUrl) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = accountConverter.convertToPost(AccountRepository.getAll());
    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveAccount', element, { headers: params }).then(function (response) {
        if (response.data === 'OK')
          toastr.success('conta ' + element.Name + ' salva!');
      });
    }, this);
  };

  return {
    getAccounts: getAccounts,
    saveAccounts: saveAccounts
  };
});
