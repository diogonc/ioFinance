angular.module('finance').factory('AccountSync', function ($http, toastr, AccountRepository, ApiSync) {

  function getAccounts(auth, baseUrl, callback) {
    var api = ApiSync.init(baseUrl, auth, 'account', AccountRepository, accountConverter);

    return api.get(callback);
  };

  function saveAccounts(auth, baseUrl, callback) {
    var api = ApiSync.init(baseUrl, auth, 'account', AccountRepository, accountConverter);

    return api.get(callback);
  };

  return {
    getAccounts: getAccounts,
    saveAccounts: saveAccounts
  };
});

