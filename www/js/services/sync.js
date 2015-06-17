angular.module('finance').factory('Sync', function($http, AccountRepository) {
  //var baseUrl = 'http://diogonc.azurewebsites.net/SyncPost/';
  var baseUrl = 'http://localhost:50164/SyncPost/';  
    
  function getAccounts(username, token, propertyId) {
    var data = {
      login: username,
      token: token,
      propertyId: propertyId
    }
    return $http.get(baseUrl + 'getAccounts', data).then(function(response) {
      var dataConverted =  sync.convertAccount(response.data);
      AccountRepository.updateAllData(dataConverted);
    });
  };
  
  return {
    getAccounts: getAccounts
  };
});
